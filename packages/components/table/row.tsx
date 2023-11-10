import { CSSProperties } from "react";
import { ICol, IRow } from "./type";

function Col(props: ICol) {
	const { col, index, data } = props;

	const style: CSSProperties = {
		gridColumn: `${1 + index} / ${2 + index}`,
	};

	return (
		<div className='i-table-td' data-col={col.field} style={style}>
			{data[col.field]}
		</div>
	);
}

export default function Row(props: IRow) {
	const { row, columns } = props;

	return (
		<div className='i-table-row'>
			{columns.map((col, i) => (
				<Col key={i} index={i} col={col} data={row} />
			))}
		</div>
	);
}
