import { useMemoizedFn } from "ahooks";
import classNames from "classnames";
import { CSSProperties } from "react";
import { ICol, IColumn, IHeader, IRow } from "./type";

function getCellStyle({
	align,
	fixed,
	col,
	row,
	colSpan = 1,
	rowSpan = 1,
	isHeader,
}: Pick<IColumn, "align" | "fixed"> & {
	col: number;
	row: number;
	colSpan?: number;
	rowSpan?: number;
	isHeader?: boolean;
}) {
	const style = {
		"--table-align": align,
		gridArea: `${row + 1} / ${col + 1} / ${row + 1 + rowSpan} / ${
			col + 1 + colSpan
		}`,
		insetInline: `var(--table-td-inset-${col})`,
	} as CSSProperties;

	if (fixed) style.zIndex = isHeader ? 3 : 2;

	return style;
}

function Col(props: ICol) {
	const { column, row, col, data, onCellClick } = props;
	const { id, fixed, align, rowSpan, render } = column;
	const style = getCellStyle({ align, fixed, col, row, rowSpan });

	const handleTdClick = useMemoizedFn(() => {
		onCellClick?.(data, id, row, col);
	});

	return (
		<div
			className={classNames("i-table-td")}
			data-col={id}
			style={style}
			onClick={handleTdClick}
		>
			<div className='i-table-td-content'>
				{render?.(data[id], data, col) || data[id]}
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
					id,
					title,
					fixed,
					colSpan,
					sorter,
					align,
					renderHeader,
				} = column;
				const style = getCellStyle({
					align,
					fixed,
					row: 0,
					col,
					colSpan,
					isHeader: true,
				});

				return (
					<div
						key={col}
						data-col={id}
						className={classNames("i-table-td")}
						style={{ ...style, insetBlockStart: 0 }}
					>
						<div className='i-table-td-content'>
							{renderHeader?.(column, col) || title || id}
						</div>
					</div>
				);
			})}
		</div>
	);
}
