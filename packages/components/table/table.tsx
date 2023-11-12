import { useReactive } from "ahooks";
import classNames from "classnames";
import { CSSProperties, useEffect } from "react";
import "./index.scss";
import Row, { Header, Resize } from "./row";
import type { Props } from "./type";

type State = {
	columns: any[];
	widths: string[];
	style: CSSProperties;
};

const Table = (props: Props): JSX.Element => {
	const { data = [], columns, border = true, style, className } = props;

	const state = useReactive<State>({
		columns: [],
		widths: [],
		style: {},
	});

	const handleWidthChange = (i: number, width: number) => {
		const { widths } = state;
		widths[i] = `${width}px`;
		state.widths = [...widths];
		console.log(state.widths);
	};

	useEffect(() => {
		state.style = {
			"--table-columns": state.widths.join(" "),
		} as CSSProperties;
	}, [state.widths]);

	useEffect(() => {
		state.columns = columns
			? columns
			: data.length
			? Object.keys(data[0]).map((key) => ({ field: key }))
			: [];

		state.widths = state.columns.map((col) => col.width ?? "1fr");
	}, [columns]);

	return (
		<div
			className={classNames("i-table-container", className)}
			style={style}
		>
			<div
				className={classNames("i-table", {
					"i-table-bordered": border,
				})}
				style={state.style}
			>
				<Header columns={state.columns} />

				<Resize
					widths={state.widths}
					onWidthChange={handleWidthChange}
				/>

				{data.map((row, i) => (
					<Row key={i} data={row} columns={state.columns} />
				))}
			</div>
		</div>
	);
};

export default Table;
