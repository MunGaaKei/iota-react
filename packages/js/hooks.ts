import PubSub from "pubsub-js";
import { useEffect } from "react";

type TMouseEvent = (e: MouseEvent) => void;

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

const MouseMoveEvents = new Set<TMouseEvent>();
const MouseUpEvents = new Set<TMouseEvent>();

document.addEventListener("mousemove", (e: MouseEvent) => {
	for (const listener of MouseMoveEvents.values()) {
		listener(e);
	}
});

document.addEventListener("mouseup", (e) => {
	for (const listener of MouseUpEvents.values()) {
		listener(e);
	}
});

export function useMouseMove(listener: TMouseEvent) {
	useEffect(() => {
		MouseMoveEvents.add(listener);
		return () => {
			MouseMoveEvents.delete(listener);
		};
	}, []);
}

export function useMouseUp(listener: TMouseEvent) {
	useEffect(() => {
		MouseUpEvents.add(listener);
		return () => {
			MouseUpEvents.delete(listener);
		};
	}, []);
}
