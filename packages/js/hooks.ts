import PubSub from "pubsub-js";
import { useEffect } from "react";

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
