import { ReactNode } from "react";

export type IData = {} & Record<string, any>;

export type IColumn = {
	field: string;
	sorter?: boolean;
	fixed?: "left" | "right";
	render?: (value?: any, row?: IData, index?: number) => ReactNode;
};

export interface Props {
	data: IData[];
	columns?: any[];
}

export interface IRow {
	row: IData;
	columns: any[];
}

export interface ICol {
	col: IColumn;
	data: IData;
	index: number;
}
