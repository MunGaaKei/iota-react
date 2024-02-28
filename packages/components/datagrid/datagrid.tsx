import classNames from "classnames";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ScrollArea from "react-custom-scrollbars";
import "./index.scss";
import Row, { Header } from "./row";
import type { IDatagrid } from "./type";

const Datagrid = (props: IDatagrid): JSX.Element => {
	const {
		data = [],
		columns = [],
		border,
		striped,
		header = true,
		resizable,
		cellPadding = ".25em .5em",
		style = {},
		className,
		onCellClick,
		onRowClick,
	} = props;

	const [widths, setWidths] = useState<number[]>([]);
	const container = useRef<HTMLDivElement>(null);

	const styles = useMemo(() => {
		if (!widths.length) return {};

		const o = {
			"--grid-template-columns": widths.map((w) => `${w}px`).join(" "),
		};

		if (resizable) {
			const fws = columns.map((col, i) => {
				const { fixed } = col;
				if (!fixed) return 0;

				return widths[i];
			});
			columns.map((col, i) => {
				const { fixed } = col;
				if (!fixed) return;

				if (i === 0) {
					o[`--datagrid-cell-inset-0`] = 0;
				} else if (i === fws.length - 1) {
					o[`--datagrid-cell-inset-${fws.length - 1}`] = "auto 0";
				} else {
					const isLeft = fixed === "left";
					const before = isLeft ? fws.slice(0, i) : fws.slice(i + 1);
					const sum = before.reduce((pre, cur) => pre + cur) + "px";
					const result = isLeft ? `${sum} auto` : `auto ${sum}`;
					o[`--datagrid-cell-inset-${i}`] = result;
				}
			});
		}

		return Object.assign(o, style);
	}, [widths, resizable]);

	const handleWidthChange = useCallback(
		(i: number, w: number) => {
			if (!resizable) return;

			setWidths((ws) => {
				const after = [...ws];
				after[i] = w;
				return after;
			});
		},
		[resizable]
	);

	useEffect(() => {
		if (!container.current || !resizable) return;

		const { current: div } = container;
		const tds = div.querySelector(".i-datagrid-row")?.childNodes;

		if (!tds?.length) return;

		setWidths(Array.from(tds).map((node: any) => node.offsetWidth));
	}, [columns, resizable]);

	return (
		<ScrollArea
			autoHide
			style={{
				"--padding": cellPadding,
				...styles,
			}}
			className={classNames(className, {
				"i-datagrid-bordered": border,
				"i-datagrid-striped": striped,
			})}
		>
			<div ref={container} className='i-datagrid'>
				{header && (
					<Header
						columns={columns}
						resizable={resizable}
						onWidthChange={handleWidthChange}
					/>
				)}

				{data.map((row, i) => (
					<Row
						key={i}
						row={i + (header ? 1 : 0)}
						data={row}
						columns={columns}
						onCellClick={onCellClick}
						onRowClick={onRowClick}
					/>
				))}
			</div>
		</ScrollArea>
	);
};

export default Datagrid;
