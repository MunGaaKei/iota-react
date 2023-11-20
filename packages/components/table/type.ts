import { CSSProperties, ReactNode } from "react";

export type IData = {} & Record<string, any>;

export type TWidth = {
	width?: string;
	fixed?: "left" | "right";
};

export type IColumn = {
	field: string;
	title?: ReactNode;
	sorter?: boolean;
	align?: string;
	rowSpan?: number;
	colSpan?: number;
	render?: (value?: any, data?: IData, index?: number) => ReactNode;
} & TWidth;

export interface Props {
	data: IData[];
	columns?: IColumn[];
	border?: boolean;
	striped?: boolean;
	header?: boolean;
	style?: CSSProperties;
	className?: string;
	onRowClick?: (data?: IData, row?: number) => void;
	onCellClick?: (
		data?: IData,
		field?: string,
		col?: number,
		row?: number
	) => void;
}

export interface IRow {
	data: IData;
	columns: IColumn[];
}

export interface ICol {
	col: IColumn;
	data: IData;
	index: number;
}

export interface IHeader extends Omit<IRow, "data"> {}

export interface IResize {
	widths: TWidth[];
	onWidthChange: (index: number, width: number) => void;
}
