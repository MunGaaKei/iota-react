import { useMemoizedFn, useReactive } from "ahooks";
import { MouseEvent, useEffect } from "react";
import { IResize } from "./type";

export default function Resize(props: IResize) {
	const { widths, onWidthChange } = props;
	const state = useReactive({
		resizing: false,
		x: 0,
		index: 0,
		width: 0,
	});

	const handleMouseDown = useMemoizedFn((e: MouseEvent, i: number) => {
		const tar = e.target as HTMLElement;
		const width = (tar.offsetParent as HTMLElement).offsetWidth;

		Object.assign(state, {
			x: e.pageX,
			resizing: true,
			index: i,
			width,
		});
	});

	const handleMouseMove = useMemoizedFn((e: any) => {
		if (!state.resizing) return;

		e.preventDefault();

		onWidthChange(state.index, state.width + e.pageX - state.x);
	});

	const handleMouseUp = () => {
		if (!state.resizing) return;

		state.resizing = false;
	};

	useEffect(() => {
		document.addEventListener("mouseup", handleMouseUp);
		document.addEventListener("mousemove", handleMouseMove);
		return () => {
			document.removeEventListener("mouseup", handleMouseUp);
			document.removeEventListener("mousemove", handleMouseMove);
		};
	}, []);

	return (
		<div className='i-table-resize'>
			<div className='i-table-resize-lines'>
				{widths.map((w, index) => {
					const { fixed } = w;
					const style = {
						zIndex: fixed ? 3 : undefined,
						insetInline: `var(--table-td-inset-${index})`,
					};

					return (
						<div
							key={index}
							className='i-table-resize-cell'
							style={style}
						>
							<span
								className='i-table-resize-y'
								onMouseDown={(e) => handleMouseDown(e, index)}
							/>
						</div>
					);
				})}
			</div>
		</div>
	);
}