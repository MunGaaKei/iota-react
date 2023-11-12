import { CSSProperties, ReactNode } from "react";

export type IData = {} & Record<string, any>;

export type IColumn = {
	field: string;
	sorter?: boolean;
	fixed?: "left" | "right";
	render?: (value?: any, data?: IData, index?: number) => ReactNode;
};

export interface Props {
	data: IData[];
	columns?: any[];
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
	columns: any[];
}

export interface ICol {
	col: IColumn;
	data: IData;
	index: number;
}

export interface IHeader extends Omit<IRow, "data"> {}

export interface IResize {
	widths: string[];
	onWidthChange: (index: number, width: number) => void;
}
