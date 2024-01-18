import { CSSProperties, HTMLAttributes, ReactNode } from "react";

export interface IList {
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
}

export interface IListItem extends HTMLAttributes<HTMLLIElement> {
	active?: boolean;
	type?: "option" | "default";
	disabled?: boolean;
	shortcut?: ReactNode;
	children?: ReactNode;
}
