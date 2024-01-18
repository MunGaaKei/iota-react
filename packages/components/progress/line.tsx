import classNames from "classnames";
import { MouseEvent, forwardRef } from "react";
import { IProgress } from "./type";

const Line = forwardRef<
	HTMLDivElement,
	Pick<IProgress, "value" | "size" | "barClass" | "cursor"> & {
		dragging: boolean;
		onMouseDown: (e: MouseEvent) => void;
	}
>((props, ref) => {
	const { value, size, barClass, dragging, cursor, onMouseDown } = props;

	return (
		<div
			ref={ref}
			className='i-progress'
			style={{ height: size }}
			onMouseDown={onMouseDown}
		>
			<div
				className={classNames("i-progress-bar", barClass, {
					"no-transition": dragging,
				})}
				style={{ width: `${value}%` }}
			>
				{cursor && <a className='i-progress-btn'>{cursor(value)}</a>}
			</div>
		</div>
	);
});

export default Line;
