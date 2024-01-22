import { HTMLAttributes, ReactNode } from "react";

export type IData = Record<string, any>;

export type TWidth = {
	width?: string;
	fixed?: "left" | "right";
};

export type IColumn = {
	id: string;
	title?: ReactNode;
	sorter?: boolean;
	align?: string;
	rowSpan?: number;
	colSpan?: number;
	render?: (value?: any, data?: IData, index?: number) => ReactNode;
	renderHeader?: (column?: IColumn, index?: number) => ReactNode;
} & TWidth;

export interface ITable
	extends Pick<HTMLAttributes<HTMLDivElement>, "style" | "className"> {
	data: IData[];
	columns?: IColumn[];
	border?: boolean;
	striped?: boolean;
	header?: boolean;
	resizable?: boolean;
	padding?: string | number;
	onRowClick?: (data?: IData, row?: number) => void;
	onCellClick?: (
		data?: IData,
		id?: string,
		row?: number,
		col?: number
	) => void;
}

export interface IRow extends Pick<ITable, "onCellClick" | "onRowClick"> {
	data: IData;
	columns: IColumn[];
	row: number;
}

export interface ICol extends Pick<ITable, "onCellClick"> {
	column: IColumn;
	data: IData;
	row: number;
	col: number;
}

export interface IHeader extends Omit<IRow, "data" | "row"> {}

export interface IResize {
	widths: TWidth[];
	onWidthChange: (index: number, width: number) => void;
}
