import {
	ForwardRefExoticComponent,
	HTMLAttributes,
	ReactNode,
	RefAttributes,
} from "react";
import TabItem from "./item";

export interface ITabItem {
	key?: string;
	props?: any;
	title?: ReactNode;
	content?: ReactNode;
	keepalive?: boolean;
	children?: ReactNode;
}

export interface ITabs extends HTMLAttributes<HTMLDivElement> {
	active?: string;
	prepend?: ReactNode;
	append?: ReactNode;
	vertical?: boolean;
	bar?: boolean;
	toggable?: boolean;
	maxCache?: number;
	onTabChange?: (to?: string, from?: string) => void;
}

export interface RefTabs {
	open: (key: string) => void;
}

export type CompositionTabs = ForwardRefExoticComponent<
	ITabs & RefAttributes<HTMLDivElement>
> & {
	Item: typeof TabItem;
};
