import { Cell, getCellStyle } from "./cell";
import Resize from "./resize";
import { IHeader, IRow } from "./type";

export default function Row(props: IRow) {
	const { row, data, columns, onRowClick, onCellClick } = props;

	return (
		<div className='i-datagrid-row' onClick={() => onRowClick?.(data, row)}>
			{columns.map((col, i) => (
				<Cell
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
	const { columns, resizable, onWidthChange } = props;

	return (
		<div className='i-datagrid-header i-datagrid-row'>
			{columns.map((column, col) => {
				const {
					id,
					title,
					fixed,
					colSpan,
					sorter,
					justify,
					renderHeader,
				} = column;
				const style = getCellStyle({
					justify,
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
						className='i-datagrid-cell'
						style={{ ...style, insetBlockStart: 0 }}
					>
						{renderHeader?.(column, col) || title || id}

						{resizable && (
							<Resize index={col} onWidthChange={onWidthChange} />
						)}
					</div>
				);
			})}
		</div>
	);
}
