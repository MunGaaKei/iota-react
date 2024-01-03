import { useReactive } from "ahooks";
import classNames from "classnames";
import { CSSProperties, useEffect } from "react";
import "./index.scss";
import Resize from "./resize";
import Row, { Header } from "./row";
import type { Props, TWidth } from "./type";

type State = {
	columns: any[];
	widths: TWidth[];
	style: CSSProperties;
};

function tdOffset(widths: string[]) {
	const l = widths.length;
	return l === 0 ? 0 : l > 1 ? `calc(${widths.join(" + ")})` : widths[0];
}

const Table = (props: Props): JSX.Element => {
	const {
		data = [],
		columns,
		border,
		striped = true,
		header = true,
		resizable,
		padding = ".25em .5em",
		className,
		onCellClick,
		onRowClick,
		...restProps
	} = props;

	const state = useReactive<State>({
		columns: [],
		widths: [],
		style: {},
	});

	const handleWidthChange = (i: number, width: number) => {
		const { widths } = state;

		widths[i].width = `${width}px`;
		state.widths = [...widths];
	};

	useEffect(() => {
		const style: any = {};
		const widths: string[] = [];
		const lefts: string[] = [];
		const rights: string[] = [];

		state.widths.map((w, i) => {
			const { fixed, width = "" } = w;
			widths.push(width);

			if (!fixed) return;

			if (fixed === "left") {
				style[`--table-td-inset-${i}`] = `${tdOffset(lefts)} auto`;
				lefts.push(width);
			} else {
				rights[i] = width;
			}
		});

		rights.length = state.widths.length;
		Array.from(rights).map((w, i, arr) => {
			if (!w) return;

			const offset = tdOffset(
				arr.flatMap((rw: string, j: number) =>
					j > i && rw ? [rw] : []
				)
			);

			style[`--table-td-inset-${i}`] = `auto ${offset}`;
		});

		style["--table-columns"] = widths.join(" ");

		state.style = style;
	}, [state.widths]);

	useEffect(() => {
		state.columns = columns
			? columns
			: data.length
			? Object.keys(data[0]).map((key) => ({ field: key }))
			: [];

		state.widths = state.columns.map((col) => {
			const { width, fixed } = col;

			return {
				width: width ?? "1fr",
				fixed,
			};
		});
	}, [columns]);

	const style = {
		"--padding": padding,
	} as CSSProperties;

	return (
		<div
			className={classNames(
				"i-table-container",
				{
					"i-table-bordered": border,
					"i-table-striped": striped,
				},
				className
			)}
			{...restProps}
		>
			<div
				className={classNames("i-table")}
				style={{ ...state.style, ...style }}
			>
				{header && <Header columns={state.columns} />}

				{data.map((row, i) => (
					<Row
						key={i}
						row={i}
						data={row}
						columns={state.columns}
						onCellClick={onCellClick}
						onRowClick={onRowClick}
					/>
				))}

				{resizable && (
					<Resize
						widths={state.widths}
						onWidthChange={handleWidthChange}
					/>
				)}
			</div>
		</div>
	);
};

export default Table;
