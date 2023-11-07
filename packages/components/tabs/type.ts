import { HTMLAttributes, ReactNode } from "react";

type TabKey = string | number;

export interface ITab {
	key?: string | number;
	props?: any;
	title?: ReactNode;
	content?: ReactNode;
}

export interface PropsItem extends ITab {
	children?: ReactNode;
}

export interface Props extends HTMLAttributes<HTMLDivElement> {
	active?: TabKey;
	prepend?: ReactNode;
	append?: ReactNode;
	vertical?: boolean;
	lazyload?: boolean;
	bar?: boolean;
	onTabChange?: (to?: TabKey, from?: TabKey) => void;
}
