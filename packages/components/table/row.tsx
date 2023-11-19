import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import { MouseEvent, useEffect } from "react";
import { ICol, IHeader, IResize, IRow } from "./type";

function getCellStyle({ align, fixed, index }: any) {
	const style: any = {
		"--table-align": align,
	};

	if (fixed) {
		style.insetInline = `var(--table-td-inset-${index})`;
	}

	return style;
}

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
	const { field, fixed, colSpan = 1, align, render } = col;
	const style = getCellStyle({ align, fixed, index });

	return (
		<div
			className={classNames("i-table-td", {
				"i-table-td-sticky": fixed,
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
			{columns.map((col, index) => {
				const { field, title, fixed, colSpan = 1, align } = col;
				const style = getCellStyle({ align, fixed, index });

				return (
					<div
						key={index}
						data-col={field}
						className={classNames("i-table-td", {
							"i-table-td-sticky": fixed,
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
		const fixed = widths[i].fixed;
		let sibling;

		if (fixed === "right") {
			sibling = tar.nextElementSibling;
		} else {
			sibling = tar.previousElementSibling;
		}
		const left = sibling
			? sibling.getBoundingClientRect().left
			: tar.parentNode.getBoundingClientRect().left;

		console.log(tar.getBoundingClientRect());

		const width = tar.getBoundingClientRect().left - left;

		Object.assign(state, {
			x: e.pageX,
			resizing: true,
			index: i,
			width,
		});
	});

	const handleMouseMove = useMemoizedFn((e: MouseEvent) => {
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
					const { fixed } = columns[index];
					const style = {
						insetInline: `var(--table-resize-inset-${index})`,
					};

					return (
						<span
							key={index}
							className='i-table-resize-y'
							style={style}
							onMouseDown={(e) => handleMouseDown(e, index)}
						/>
					);
				})}
			</div>
		</div>
	);
}
