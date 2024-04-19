import { useMouseMove, useMouseUp } from "@p/js/hooks";
import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import { MouseEvent, useEffect, useMemo, useRef } from "react";
import "../../css/input.css";
import Circle from "./circle";
import "./index.css";
import Line from "./line";
import { IProgress } from "./type";

const Progress = (props: IProgress): JSX.Element => {
	const {
		value = 0,
		size = 8,
		height = 40,
		digits = 0,
		style,
		draggable = true,
		type = "line",
		barClass,
		label,
		labelInline,
		className,
		cursor,
		onChange,
	} = props;

	const ref = useRef<HTMLDivElement>(null);
	const state = useReactive({
		value,
		dragging: false,
		width: 0,
		start: 0,
	});

	const toFixedValue = useMemo(() => {
		let value = +state.value.toFixed(digits);
		value = Math.min(100, value);
		value = Math.max(0, value);

		return value;
	}, [state.value, digits]);

	const handleMouseDown = useMemoizedFn((e: MouseEvent) => {
		if (!ref.current || !draggable) return;

		const rect = ref.current.getBoundingClientRect();
		const value = ((e.pageX - rect.left) * 100) / rect.width;

		Object.assign(state, {
			value,
			width: rect.width,
			start: rect.left,
			dragging: true,
		});
	});

	const handleMouseMove = useMemoizedFn((e: any) => {
		if (!state.dragging || !draggable) return;
		e.preventDefault();
		const { start, width } = state;
		const offset = e.pageX - start;

		if (offset < 0 || offset > width) return;

		state.value = ((e.pageX - start) * 100) / width;
	});

	const handleMouseUp = useMemoizedFn(() => {
		if (!state.dragging || !draggable) return;

		onChange?.(toFixedValue);
		state.dragging = false;
	});

	useMouseMove(handleMouseMove);
	useMouseUp(handleMouseUp);

	useEffect(() => {
		if (value > 100) {
			state.value = 100;
			return;
		}

		if (value < 0) {
			state.value = 0;
			return;
		}

		state.value = value;
	}, [value]);

	return (
		<div
			className={classNames("i-input-label", className, {
				"i-input-inline": labelInline,
			})}
			style={style}
		>
			{label && <span className='i-input-label-text'>{label}</span>}

			{type === "line" ? (
				<Line
					ref={ref}
					size={size}
					barClass={barClass}
					dragging={state.dragging}
					value={state.value}
					cursor={cursor}
					onMouseDown={handleMouseDown}
				/>
			) : (
				<Circle value={state.value} height={height} size={size} />
			)}
		</div>
	);
};

export default Progress;
