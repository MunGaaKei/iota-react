import { TOption, TOptions } from "@p/type";
import type { RelativeOptions } from "./type";

export function getPosition(
	$source?: HTMLElement | null,
	$popup?: HTMLElement | null,
	options: RelativeOptions = {}
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

export function formatOption(options: TOptions): TOption[] {
	return options.map((option) =>
		["string", "number"].includes(typeof option)
			? { label: option, value: option }
			: option
	) as TOption[];
}

export function animate(
	from: number,
	to: number,
	duration: number = 1000,
	callback?: (v: number) => void,
	easing: (t: number) => number = (t) => 1 - Math.pow(1 - t, 4)
) {
	const start = performance.now();
	const diff = to - from;
	let raf = requestAnimationFrame(loop);

	function loop() {
		raf = requestAnimationFrame(loop);

		const past = performance.now() - start;
		let percent = past / duration;

		if (percent >= 1) {
			percent = 1;
			cancelAnimationFrame(raf);
		}

		const pass = diff * easing(percent);
		callback?.(pass);
	}
}
