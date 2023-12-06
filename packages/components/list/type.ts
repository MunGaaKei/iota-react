import { CSSProperties, HTMLAttributes, ReactNode } from "react";

export interface Props {
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
}

export interface IItem extends HTMLAttributes<HTMLDivElement> {
	active?: boolean;
	type?: "option" | "default";
	disabled?: boolean;
	shortcut?: ReactNode;
	children?: ReactNode;
}
