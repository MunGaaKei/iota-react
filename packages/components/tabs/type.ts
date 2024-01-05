import { HTMLAttributes, ReactNode } from "react";

export interface ITab {
	key?: string;
	props?: any;
	title?: ReactNode;
	content?: ReactNode;
	keepalive?: boolean;
}

export interface PropsItem extends ITab {
	children?: ReactNode;
}

export interface Props extends HTMLAttributes<HTMLDivElement> {
	active?: string;
	prepend?: ReactNode;
	append?: ReactNode;
	vertical?: boolean;
	bar?: boolean;
	toggable?: boolean;
	maxCache?: number;
	onTabChange?: (to?: string, from?: string) => void;
}

export interface ITabs {
	open: (key: string) => void;
}
