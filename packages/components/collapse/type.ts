import { HTMLAttributes, ReactNode } from "react";

export type TKey = string | number;

export interface ICollapse {
	key?: TKey;
	props?: any;
	title?: ReactNode;
	content?: ReactNode;
	disabled?: boolean;
}

export interface ICollapseItem extends ICollapse {
	disabled?: boolean;
	children?: ReactNode;
}

export interface Props extends HTMLAttributes<HTMLDivElement> {
	active?: TKey | TKey[];
	multiple?: boolean;
	border?: boolean;
	icon?: (active?: boolean) => ReactNode;
	onCollapse?: (key?: TKey, active?: boolean) => void;
}
