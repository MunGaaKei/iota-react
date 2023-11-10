import { useReactive } from "ahooks";
import { CSSProperties, useEffect, useMemo } from "react";
import "./index.scss";
import Row from "./row";
import type { Props } from "./type";

type State = {
	columns: any[];
	style: CSSProperties;
};

const Table = (props: Props): JSX.Element => {
	const { data = [], columns } = props;

	const state = useReactive<State>({
		columns: [],
		style: {},
	});

	const columnWidths = useMemo(() => {
		return state.columns.map((col) => col.width ?? "1fr");
	}, [state.columns]);

	useEffect(() => {
		state.columns =
			columns || data.length
				? Object.keys(data[0]).map((key) => ({ field: key }))
				: [];

		state.style = {
			"--grid-template-columns": columnWidths.join(" "),
		} as CSSProperties;
	}, [columns]);

	return (
		<div className='i-table' style={state.style}>
			{data.map((row, i) => (
				<Row key={i} row={row} columns={state.columns} />
			))}
		</div>
	);
};

export default Table;
