import { HTMLAttributes, ReactNode } from "react";

export interface Props
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
	onChange?: (page: number) => void;
}
