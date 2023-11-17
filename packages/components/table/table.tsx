import { useReactive } from "ahooks";
import classNames from "classnames";
import { CSSProperties, useEffect } from "react";
import "./index.scss";
import Row, { Header, Resize } from "./row";
import type { Props } from "./type";

type State = {
	columns: any[];
	widths: any[];
	style: CSSProperties;
};

function stickyOffset(widths: string[]) {
	const l = widths.length;
	return l === 0 ? 0 : l > 1 ? `calc(${widths.join(" + ")})` : widths[0];
}

const Table = (props: Props): JSX.Element => {
	const {
		data = [],
		columns,
		border = true,
		striped = true,
		style,
		className,
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
		let rights: any = {};

		state.widths.map((w, i) => {
			const { fixed, width } = w;
			widths.push(width);

			if (!fixed) return;

			if (fixed === "left") {
				style[`--table-td-inset-${i}`] = `${stickyOffset(lefts)} auto`;
				lefts.push(width);
			} else {
				rights[i] = width;
			}
		});

		rights.length = state.widths.length;
		rights = Array.from(rights);
		rights.map((w: string, i: number) => {
			if (!w) return;

			const ends = rights.slice(i + 1).filter(Boolean);
			style[`--table-td-inset-${i}`] = `auto ${stickyOffset(ends)}`;
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
			style={style}
		>
			<div className={classNames("i-table")} style={state.style}>
				<Header columns={state.columns} />

				{data.map((row, i) => (
					<Row key={i} data={row} columns={state.columns} />
				))}

				<Resize
					columns={state.columns}
					onWidthChange={handleWidthChange}
					widths={state.widths}
				/>
			</div>
		</div>
	);
};

export default Table;
