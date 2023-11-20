import classNames from "classnames";
import { ICol, IColumn, IHeader, IRow } from "./type";

function getCellStyle({
	align,
	fixed,
	index,
}: Pick<IColumn, "align" | "fixed"> & { index: number }) {
	const style: any = {
		"--table-align": align,
	};

	if (fixed) {
		style.insetInline = `var(--table-td-inset-${index})`;
	}

	return style;
}

function Col(props: ICol) {
	const { col, index, data } = props;
	const { field, fixed, colSpan = 1, align, render } = col;
	const style = getCellStyle({ align, fixed, index });

	return (
		<div
			className={classNames("i-table-td", {
				"i-table-td-sticky": fixed,
			})}
			data-col={field}
			style={style}
		>
			{render?.(data[field], data, index) || data[field]}
		</div>
	);
}

export default function Row(props: IRow) {
	const { data, columns } = props;

	return (
		<div className='i-table-row'>
			{columns.map((col, i) => (
				<Col key={i} index={i} col={col} data={data} />
			))}
		</div>
	);
}

export function Header(props: IHeader) {
	const { columns } = props;

	return (
		<div className='i-table-header i-table-row'>
			{columns.map((col, index) => {
				const { field, title, fixed, colSpan = 1, align } = col;
				const style = getCellStyle({ align, fixed, index });

				return (
					<div
						key={index}
						data-col={field}
						className={classNames("i-table-td", {
							"i-table-td-sticky": fixed,
						})}
						style={style}
					>
						{title || field}
					</div>
				);
			})}
		</div>
	);
}
