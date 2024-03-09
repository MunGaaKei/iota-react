import classNames from "classnames";
import { ICell, IColumn } from "./type";

export function getCellStyle({
	justify,
	fixed,
	col,
	row,
	colSpan = 1,
	rowSpan = 1,
	isHeader,
}: Pick<IColumn, "justify" | "fixed"> & {
	col: number;
	row: number;
	colSpan?: number;
	rowSpan?: number;
	isHeader?: boolean;
}) {
	const style = {
		"--datagrid-justify": justify,
		gridArea: `${row + 1} / ${col + 1} / ${row + 1 + rowSpan} / ${
			col + 1 + colSpan
		}`,
		insetInline: `var(--datagrid-cell-inset-${col})`,
	};

	if (fixed) style["zIndex"] = isHeader ? 3 : 2;

	return style;
}

export function Cell(props: ICell) {
	const { column, row, col, data, onCellClick } = props;
	const { id, fixed, justify, rowSpan, render } = column;
	const style = getCellStyle({ justify, fixed, col, row, rowSpan });

	const handleCellClick = () => {
		onCellClick?.(data, column, row, col);
	};

	return (
		<div
			className={classNames("i-datagrid-cell", {
				[`i-datagrid-cell-fixed-${fixed}`]: fixed,
			})}
			data-col={id}
			style={style}
			onClick={handleCellClick}
		>
			{render?.(data[id], data, col) || data[id]}
		</div>
	);
}
