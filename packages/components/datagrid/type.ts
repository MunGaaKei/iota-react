import { CSSProperties, ReactNode } from "react";

export type IData = Record<string, any>;

export type IColumn = {
	id: string;
	title?: ReactNode;
	sorter?: boolean;
	justify?: string;
	rowSpan?: number;
	colSpan?: number;
	width?: string;
	fixed?: "left" | "right";
	render?: (value?: any, data?: IData, index?: number) => ReactNode;
	renderHeader?: (column?: IColumn, index?: number) => ReactNode;
};

export interface IDatagrid {
	data: IData[];
	columns?: IColumn[];
	border?: boolean;
	striped?: boolean;
	header?: boolean;
	resizable?: boolean;
	cellPadding?: string | number;
	style?: CSSProperties;
	className?: string;
	onRowClick?: (data?: IData, row?: number) => void;
	onCellClick?: (
		data?: IData,
		id?: string,
		row?: number,
		col?: number
	) => void;
}

export interface IRow extends Pick<IDatagrid, "onCellClick" | "onRowClick"> {
	data: IData;
	columns: IColumn[];
	row: number;
}

export interface ICell extends Pick<IDatagrid, "onCellClick"> {
	column: IColumn;
	data: IData;
	row: number;
	col: number;
}

export interface IHeader extends Omit<IRow, "data" | "row"> {
	resizable?: boolean;
	onWidthChange: (i: number, width: number) => void;
}