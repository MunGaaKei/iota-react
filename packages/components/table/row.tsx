import { SwapVertRound } from "@ricons/material";
import { useMemoizedFn } from "ahooks";
import classNames from "classnames";
import Icon from "../icon";
import { ICol, IColumn, IHeader, IRow } from "./type";

function getCellStyle({
	align,
	fixed,
	col,
}: Pick<IColumn, "align" | "fixed"> & { col: number }) {
	const style: any = {
		"--table-align": align,
	};

	if (fixed) {
		style.insetInline = `var(--table-td-inset-${col})`;
	}

	return style;
}

function Col(props: ICol) {
	const { column, row, col, data, onCellClick } = props;
	const { field, fixed, colSpan = 1, align, render } = column;
	const style = getCellStyle({ align, fixed, col });

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
					colSpan = 1,
					sorter,
					align,
				} = column;
				const style = getCellStyle({ align, fixed, col });

				return (
					<div
						key={col}
						data-col={field}
						className={classNames("i-table-td", {
							"i-table-td-sticky": fixed,
						})}
						style={style}
					>
						{sorter && (
							<Icon
								icon={<SwapVertRound />}
								className='i-table-sorter'
							/>
						)}

						<div className='i-table-td-content'>
							{title || field}
						</div>
					</div>
				);
			})}
		</div>
	);
}
