import { useMemoizedFn } from "ahooks";
import classNames from "classnames";
import { CSSProperties } from "react";
import { ICol, IColumn, IHeader, IRow } from "./type";

function getCellStyle({
	align,
	fixed,
	col,
	colSpan = 1,
	rowSpan = 1,
}: Pick<IColumn, "align" | "fixed"> & {
	col: number;
	colSpan?: number;
	rowSpan?: number;
}) {
	const style = {
		"--table-align": align,
		"--table-column": `${col + 1} / ${col + colSpan + 1}`,
	} as CSSProperties;

	if (fixed) {
		style.insetInline = `var(--table-td-inset-${col})`;
	}

	return style;
}

function Col(props: ICol) {
	const { column, row, col, data, onCellClick } = props;
	const { field, fixed, align, rowSpan, render } = column;
	const style = getCellStyle({ align, fixed, col, rowSpan });

	const handleTdClick = useMemoizedFn(() => {
		onCellClick?.(data, field, row, col);
	});

	return (
		<div
			className={classNames("i-table-td", {
				"i-table-td-sticky": fixed,
			})}
			data-col={field}
			style={style}
			onClick={handleTdClick}
		>
			<div className='i-table-td-content'>
				{render?.(data[field], data, col) || data[field]}
			</div>
		</div>
	);
}

export default function Row(props: IRow) {
	const { row, data, columns, onRowClick, onCellClick } = props;

	return (
		<div className='i-table-row' onClick={() => onRowClick?.(data, row)}>
			{columns.map((col, i) => (
				<Col
					key={i}
					column={col}
					col={i}
					row={row}
					data={data}
					onCellClick={onCellClick}
				/>
			))}
		</div>
	);
}

export function Header(props: IHeader) {
	const { columns } = props;

	return (
		<div className='i-table-header i-table-row'>
			{columns.map((column, col) => {
				const {
					field,
					title,
					fixed,
					colSpan,
					sorter,
					align,
					renderHeader,
				} = column;
				const style = getCellStyle({ align, fixed, col, colSpan });

				return (
					<div
						key={col}
						data-col={field}
						className={classNames("i-table-td", {
							"i-table-td-sticky": fixed,
						})}
						style={style}
					>
						<div className='i-table-td-content'>
							{renderHeader?.(column, col) || title || field}
						</div>
					</div>
				);
			})}
		</div>
	);
}
