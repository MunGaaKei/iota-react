import { CSSProperties, HTMLAttributes, ReactNode } from "react";

export interface IList {
	virtual?: {};
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
}

export interface IListItem extends HTMLAttributes<HTMLLIElement> {
	active?: boolean;
	type?: "option" | "default";
	align?: string;
	disabled?: boolean;
}
