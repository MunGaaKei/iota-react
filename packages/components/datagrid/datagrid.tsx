import { getNextSorter } from "@p/js/utils";
import { useReactive } from "ahooks";
import classNames from "classnames";
import { MouseEvent, useCallback, useEffect, useMemo, useRef } from "react";
import ScrollArea from "react-custom-scrollbars";
import Loading from "../loading";
import Empty from "../utils/empty";
import "./index.scss";
import Row, { Header } from "./row";
import type { IColumn, IData, IDatagrid, TDatagridState } from "./type";

const Datagrid = (props: IDatagrid): JSX.Element => {
	const {
		data = [],
		columns = [],
		border,
		striped,
		header = true,
		resizable,
		cellPadding = ".5em .5em",
		empty = <Empty />,
		loading,
		style,
		className,
		onCellClick,
		onRowClick,
		onHeaderClick,
		onSort,
	} = props;

	const container = useRef<HTMLDivElement>(null);
	const state = useReactive<TDatagridState>({
		rows: data,
		widths: [],
		sortBy: "",
		sortType: "",
	});

	const styles = useMemo(() => {
		const { widths } = state;
		if (!widths.length) return {};

		const o = {
			"--grid-template-columns": widths.map((w) => `${w}px`).join(" "),
		};

		if (resizable) {
			const fws = columns.map((col, i) => {
				const { fixed } = col;
				if (!fixed) return 0;

				return widths[i];
			});
			columns.map((col, i) => {
				const { fixed } = col;
				if (!fixed) return;

				if (i === 0) {
					o[`--datagrid-cell-inset-0`] = 0;
				} else if (i === fws.length - 1) {
					o[`--datagrid-cell-inset-${fws.length - 1}`] = "auto 0";
				} else {
					const isLeft = fixed === "left";
					const before = isLeft ? fws.slice(0, i) : fws.slice(i + 1);
					const sum = before.reduce((pre, cur) => pre + cur) + "px";
					const result = isLeft ? `${sum} auto` : `auto ${sum}`;
					o[`--datagrid-cell-inset-${i}`] = result;
				}
			});
		}

		return Object.assign(o, style);
	}, [state.widths, resizable]);

	const handleWidthChange = useCallback(
		(i: number, w: number) => {
			if (!resizable) return;

			const [...ws] = state.widths;
			ws[i] = w;
			state.widths = ws;
		},
		[resizable]
	);

	const handleHeaderClick = useCallback(
		(column?: IColumn, e?: MouseEvent) => {
			if (column?.sorter) {
				const [sortBy, sortType] = getNextSorter(
					state.sortBy,
					state.sortType,
					column.id
				);

				Object.assign(state, {
					sortBy,
					sortType,
				});

				onSort?.(sortBy, sortType);
			}

			onHeaderClick?.(column, e);
		},
		[]
	);

	const rows = useMemo(() => {
		const { sortBy, sortType } = state;

		if (sortBy && !onSort) {
			const sorter = columns.find((col) => col.id === sortBy)?.sorter;
			const sortFn =
				typeof sorter === "function"
					? sorter
					: (a: IData, b: IData) => b[sortBy] - a[sortBy];
			const sorted = [...data].sort(sortFn);

			return sortType === "desc" ? sorted : sorted.reverse();
		}

		return data;
	}, [data, columns, state.sortBy, state.sortType]);

	useEffect(() => {
		if (!container.current || !resizable) return;

		const { current: div } = container;
		const tds = div.querySelector(".i-datagrid-row")?.childNodes;

		if (!tds?.length) return;

		state.widths = Array.from(tds).map((node: any) => node.offsetWidth);
	}, [columns, resizable]);

	return (
		<ScrollArea
			autoHide
			style={{
				"--padding": cellPadding,
				...styles,
			}}
			className={classNames(className, {
				"i-datagrid-bordered": border,
				"i-datagrid-striped": striped,
			})}
			renderView={(props) => (
				<div
					{...props}
					className={classNames({ "i-datagrid-loading": loading })}
				/>
			)}
		>
			<div ref={container} className='i-datagrid'>
				{header && (
					<Header
						columns={columns}
						resizable={resizable}
						sortType={state.sortType}
						sortBy={state.sortBy}
						onWidthChange={handleWidthChange}
						onHeaderClick={handleHeaderClick}
					/>
				)}

				{rows.map((row, i) => (
					<Row
						key={i}
						row={i + (header ? 1 : 0)}
						data={row}
						columns={columns}
						onCellClick={onCellClick}
						onRowClick={onRowClick}
					/>
				))}

				{rows.length < 1 && empty}
			</div>
			{loading && <Loading size='1.5em' className='color-3' />}
		</ScrollArea>
	);
};

export default Datagrid;
