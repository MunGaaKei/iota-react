import { HTMLAttributes, ReactNode } from "react";

export interface IPagination
	extends Omit<HTMLAttributes<HTMLDivElement>, "onChange"> {
	page?: number;
	total?: number;
	sibling?: number;
	size?: number;
	sizeOptions?: number[];
	prev?: ReactNode;
	next?: ReactNode;
	simple?: boolean;
	jumper?: boolean;
	renderPage?: (i: number) => ReactNode;
	onChange?: (page?: number) => void;
}

export interface IPageItem
	extends Pick<IPagination, "page" | "children" | "onChange"> {
	active?: boolean;
}
