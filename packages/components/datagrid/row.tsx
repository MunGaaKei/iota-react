import classNames from "classnames";
import { Cell, getCellStyle } from "./cell";
import Resize from "./resize";
import Sorter from "./sorter";
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
	const {
		columns,
		resizable,
		sortBy,
		sortType,
		onWidthChange,
		onHeaderClick,
	} = props;

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

				const order = sortBy === id ? sortType : "";

				return (
					<div
						key={col}
						data-col={id}
						className={classNames("i-datagrid-cell", {
							"i-datagrid-has-sorter": sorter,
						})}
						style={{ ...style, insetBlockStart: 0 }}
						onClick={(e) => onHeaderClick?.(column, e)}
					>
						{renderHeader?.(column, col) || title || id}

						{sorter && <Sorter type={order} />}

						{resizable && (
							<Resize index={col} onWidthChange={onWidthChange} />
						)}
					</div>
				);
			})}
		</div>
	);
}
