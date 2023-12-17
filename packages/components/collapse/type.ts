import { HTMLAttributes, ReactNode } from "react";

export type TKey = string | number;

export interface ICollapse {
	key?: TKey;
	props?: any;
	title?: ReactNode;
	content?: ReactNode;
}

export interface PropsItem extends ICollapse {
	children?: ReactNode;
}

export interface Props extends HTMLAttributes<HTMLDivElement> {
	active?: TKey | TKey[];
	onlyone?: boolean;
	border?: boolean;
	icon?: (active?: boolean) => ReactNode;
	onCollapse?: (key?: TKey, before?: TKey | TKey[]) => void;
}
