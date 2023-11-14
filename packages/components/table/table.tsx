import { useReactive } from "ahooks";
import classNames from "classnames";
import { CSSProperties, useEffect } from "react";
import "./index.scss";
import Row, { Header } from "./row";
import type { Props } from "./type";

type State = {
	columns: any[];
	widths: any[];
	style: CSSProperties;
};

const Table = (props: Props): JSX.Element => {
	const {
		data = [],
		columns,
		border = true,
		striped = true,
		style,
		className,
	} = props;

	const state = useReactive<State>({
		columns: [],
		widths: [],
		style: {},
	});

	const handleWidthChange = (i: number, width: number) => {
		const { widths } = state;
		widths[i] = `${width}px`;
		state.widths = [...widths];
	};

	useEffect(() => {
		const style: any = {};
		const widths: string[] = [];
		const lefts: string[] = [];
		const rights: string[] = [];

		state.widths.map((w, i) => {
			const { fixed, width } = w;
			widths.push(width);

			if (!fixed) return;

			if (fixed === "left") {
				const l = lefts.length;
				const before =
					l === 0
						? 0
						: l > 1
						? `calc(${lefts.join(" + ")})`
						: lefts[0];
				style[`--table-td-inset-${i}`] = `${before} auto`;
				lefts.push(width);
			} else {
				rights.push(width);
			}
			console.log(rights);
		});
		style["--table-columns"] = widths.join(" ");

		state.style = style;
	}, [state.widths]);

	useEffect(() => {
		state.columns = columns
			? columns
			: data.length
			? Object.keys(data[0]).map((key) => ({ field: key }))
			: [];

		state.widths = state.columns.map((col) => {
			const { width, fixed } = col;

			return {
				width: width ?? "1fr",
				fixed,
			};
		});
	}, [columns]);

	return (
		<div
			className={classNames("i-table-container", className)}
			style={style}
		>
			<div
				className={classNames("i-table", {
					"i-table-bordered": border,
					"i-table-striped": striped,
				})}
				style={state.style}
			>
				<Header columns={state.columns} />

				{data.map((row, i) => (
					<Row key={i} data={row} columns={state.columns} />
				))}

				{/* <Resize
					columns={state.columns}
					widths={state.widths}
					onWidthChange={handleWidthChange}
				/> */}
			</div>
		</div>
	);
};

export default Table;
