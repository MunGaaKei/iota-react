import { useMouseMove, useMouseUp } from "@p/js/hooks";
import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import { MouseEvent, useEffect, useRef } from "react";
import "./index.scss";
import { Props } from "./type";

const Progress = (props: Props): JSX.Element => {
	const {
		value = 0,
		height = 8,
		style = {},
		draggable,
		barClass,
		button,
		className,
		onChange,
	} = props;

	const ref = useRef<HTMLDivElement>(null);
	const state = useReactive({
		value,
		dragging: false,
		width: 0,
		start: 0,
	});

	const handleMouseDown = useMemoizedFn((e: MouseEvent) => {
		if (!ref.current || !draggable) return;

		const rect = ref.current.getBoundingClientRect();
		const offset = e.pageX - rect.left;

		Object.assign(state, {
			value: ((e.pageX - rect.left) * 100) / rect.width,
			width: rect.width,
			start: rect.left,
			dragging: true,
		});
	});

	const handleMouseMove = useMemoizedFn((e: any) => {
		if (!state.dragging || !draggable) return;
		const { start, width } = state;
		const offset = e.pageX - start;

		if (offset < 0 || offset > width) return;

		state.value = ((e.pageX - start) * 100) / width;
	});

	const handleMouseUp = useMemoizedFn(() => {
		if (!state.dragging || !draggable) return;
		onChange?.(state.value);
		state.dragging = false;
	});

	useMouseMove(handleMouseMove);
	useMouseUp(handleMouseUp);

	useEffect(() => {
		state.value = value;
	}, [value]);

	return (
		<div
			ref={ref}
			className={classNames("i-progress", className)}
			style={{ height, ...style }}
			onMouseDown={handleMouseDown}
		>
			<div
				className={classNames("i-progress-bar", barClass, {
					"no-transition": state.dragging,
				})}
				style={{ transform: `scaleX(${state.value / 100})` }}
			>
				{button && <a className='i-progress-btn'>{button}</a>}
			</div>
		</div>
	);
};

export default Progress;
