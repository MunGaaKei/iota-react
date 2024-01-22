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
	}, [listener]);
}

export function useMouseUp(listener: TMouseEvent) {
	useEffect(() => {
		MouseUpEvents.add(listener);
		return () => {
			MouseUpEvents.delete(listener);
		};
	}, [listener]);
}

export function useIntersectionObserver(configs?: IntersectionObserverInit) {
	const WM = new WeakMap();
	const IO = new IntersectionObserver((entries) => {
		entries.map((entry) => {
			const callback = WM.get(entry.target);

			callback?.(entry.target, entry.isIntersecting);
		});
	}, configs);

	function observe(target: HTMLElement, callback: Function) {
		if (WM.get(target)) return;

		WM.set(target, callback);
		target && IO.observe(target);
	}

	function unobserve(target: HTMLElement) {
		target && IO.unobserve(target);
		WM.delete(target);
	}

	function disconnect() {
		IO.disconnect();
	}

	return {
		observe,
		unobserve,
		disconnect,
	};
}

export function useResizeObserver() {
	const WM = new WeakMap();
	const IO = new ResizeObserver((entries) => {
		entries.map((entry) => {
			const callback = WM.get(entry.target);

			callback?.(entry.target);
		});
	});

	function observe(target: HTMLElement, callback: Function) {
		if (WM.get(target)) return;

		target && IO.observe(target);
		WM.set(target, callback);
	}

	function unobserve(target: HTMLElement) {
		target && IO.unobserve(target);
		WM.delete(target);
	}

	function disconnect() {
		IO.disconnect();
	}

	return {
		observe,
		unobserve,
		disconnect,
	};
}
