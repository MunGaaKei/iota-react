import PubSub from "pubsub-js";
import { useEffect } from "react";
import type { PositionOptions } from "./type";

export function useFormRegist(props: {
	form?: string;
	name?: string;
	state?: { [key: string]: any };
	initialValue?: { [key: string]: any };
}): ((value: any) => void) | null {
	const { form, name, state, initialValue } = props;

	if (!form || !name || !state) return null;

	useEffect(() => {
		const onSetFieldValue = PubSub.subscribe(
			`${form}:set:${name}`,
			(evt, value) => {
				Object.assign(state, { value });
			}
		);

		const onInvalid = PubSub.subscribe(
			`${form}:invalid:${name}`,
			(evt, status) => {
				Object.assign(state, status);
			}
		);

		PubSub.publish(`${form}:setFormState`, { [name]: initialValue });

		return () => {
			PubSub.unsubscribe(onSetFieldValue);
			PubSub.unsubscribe(onInvalid);
		};
	}, []);

	return (value: any) => {
		PubSub.publish(`${form}:setFormState`, { [name]: value });
	};
}

export function usePosition(
	$source?: HTMLElement | null,
	$popup?: HTMLElement | null,
	options: PositionOptions = {}
): [x: number, y: number] {
	const {
		refWindow = true,
		gap = 0,
		offset = 0,
		position = "top",
		align,
	} = options;

	if (!$source || !$popup) return [0, 0];

	const rectT = $source.getBoundingClientRect();
	const rectC = $popup.getBoundingClientRect();

	let w = window.innerWidth;
	let h = window.innerHeight;
	let {
		left: tl,
		top: tt,
		right: tr,
		bottom: tb,
		width: tw,
		height: th,
	} = rectT;
	const { height: ch, width: cw } = rectC;

	if (!refWindow) {
		const rectPa = $source.offsetParent?.getBoundingClientRect();

		w = rectPa?.width || w;
		h = rectPa?.height || h;
		tl = $source.offsetLeft;
		tt = $source.offsetTop;
		tr = tl + rectT.width;
		tb = tt + rectT.height;
	}

	let y = 0;
	let x = 0;

	switch (position) {
		case "left":
		case "right":
			y =
				th !== ch
					? computePosition({
							containerSize: h,
							targetSize: th,
							targetOffset: tt,
							contentSize: ch,
							gap,
							align,
					  })
					: tt;

			const xl = tl - offset - cw;
			const xr = tr + offset + cw;
			if (position === "left") {
				x = xl < 0 ? tr + offset : xl;
			} else {
				x = w > xr ? tr + offset : xl;
			}
			break;
		case "top":
		case "bottom":
			x =
				tw !== cw
					? computePosition({
							containerSize: w,
							targetOffset: tl,
							targetSize: tw,
							contentSize: cw,
							gap,
							align,
					  })
					: tl;

			const yt = tt - offset - ch;
			const yb = tb + offset + ch;
			if (position === "top") {
				y = yt < 0 ? tb + offset : yt;
			} else {
				y = h > yb ? tb + offset : yt;
			}
			break;
		default:
			break;
	}

	return [x, y];
}

function computePosition({
	containerSize,
	targetSize,
	targetOffset,
	contentSize,
	gap,
}: {
	containerSize: number;
	targetSize: number;
	targetOffset: number;
	contentSize: number;
	gap: number;
	align?: "start" | "center" | "end";
}) {
	const centerPoint = targetOffset + targetSize / 2;

	if (targetSize >= contentSize) {
		return centerPoint - contentSize / 2;
	}

	if (centerPoint + contentSize / 2 + gap > containerSize) {
		return targetOffset + targetSize - contentSize;
	}

	if (centerPoint - contentSize / 2 - gap < 0) {
		return gap;
	}

	return centerPoint - contentSize / 2;
}

const ClickOutsideHandlers = new Map();

document.addEventListener("mousedown", function (e) {
	const target = e.target;

	for (const handler of ClickOutsideHandlers.entries()) {
		const [$el, listener] = handler;
		if (!$el) {
			ClickOutsideHandlers.delete($el);
			return;
		}

		!$el.contains(target) && listener?.(e);
	}
});

export function useClickOutside(
	target?: HTMLElement | null,
	listener?: (e: MouseEvent) => void,
	disable?: boolean
) {
	if (disable) return;
	const handleClick = (e: MouseEvent) => {
		target && !target.contains(e.target as HTMLElement) && listener?.(e);
	};

	useEffect(() => {
		ClickOutsideHandlers.set(target, handleClick);
		return () => {
			ClickOutsideHandlers.delete(target);
		};
	});
}
