import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import { CSSProperties, MouseEvent, useEffect } from "react";
import { ICol, IHeader, IResize, IRow } from "./type";

export default function Row(props: IRow) {
	const { data, columns } = props;

	return (
		<div className='i-table-row'>
			{columns.map((col, i) => (
				<Col key={i} index={i} col={col} data={data} />
			))}
		</div>
	);
}

function Col(props: ICol) {
	const { col, index, data } = props;
	const { field, fixed, colSpan = 1, render } = col;

	const style = {
		"--table-column": `${1 + index} / ${1 + colSpan + index}`,
	} as CSSProperties;

	return (
		<div
			className={classNames("i-table-td", {
				[`sticky-${fixed}`]: fixed,
			})}
			data-col={field}
			style={style}
		>
			{render?.(data[field], data, index) || data[field]}
		</div>
	);
}

export function Header(props: IHeader) {
	const { columns } = props;

	return (
		<div className='i-table-header i-table-row sticky-top'>
			{columns.map((col, i) => {
				const { field, title, fixed, colSpan = 1 } = col;
				const style = {
					"--table-column": `${1 + i} / ${1 + colSpan + i}`,
				} as CSSProperties;

				return (
					<div
						key={i}
						className={classNames("i-table-td", {
							[`sticky-${fixed}`]: fixed,
						})}
						style={style}
					>
						{title || field}
					</div>
				);
			})}
		</div>
	);
}

export function Resize(props: IResize) {
	const { columns, widths, onWidthChange } = props;
	const state = useReactive({
		resizing: false,
		x: 0,
		index: 0,
		width: 0,
	});

	const handleMouseDown = useMemoizedFn((e: MouseEvent, i: number) => {
		const tar = e.target as HTMLElement;
		const prev = tar.previousElementSibling as HTMLElement;
		const width = tar.offsetLeft - (prev?.offsetLeft || 0);

		Object.assign(state, {
			x: e.pageX,
			resizing: true,
			index: i,
			width,
		});
	});

	const handleMouseMove = useMemoizedFn((e: globalThis.MouseEvent) => {
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
		<div className='i-table-resizes'>
			{widths.map((w, i) => {
				const { colSpan = 1, fixed } = columns[i];
				const style = {
					"--table-column": `${2 + i} / ${2 + colSpan + i}`,
				} as CSSProperties;

				return (
					<span
						key={i}
						className={classNames("i-table-y-resize", {
							[`sticky-${fixed}`]: fixed,
						})}
						style={style}
						onMouseDown={(e) => handleMouseDown(e, i)}
					/>
				);
			})}
		</div>
	);
}