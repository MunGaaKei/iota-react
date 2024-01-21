import {
	ForwardRefExoticComponent,
	HTMLAttributes,
	ReactNode,
	RefAttributes,
} from "react";
import TabItem from "./item";

export type TTabKey = string | number;

export interface ITabItem {
	key?: TTabKey;
	props?: any;
	title?: ReactNode;
	content?: ReactNode;
	keepalive?: boolean;
	intersecting?: boolean;
	children?: ReactNode;
}

export interface ITabs extends HTMLAttributes<HTMLDivElement> {
	active?: TTabKey;
	prepend?: ReactNode;
	append?: ReactNode;
	vertical?: boolean;
	bar?: boolean;
	toggable?: boolean;
	maxCache?: number;
	onTabChange?: (to?: TTabKey, from?: TTabKey) => void;
}

export interface RefTabs {
	open: (key: TTabKey) => void;
	close: (key: TTabKey) => void;
}

export type CompositionTabs = ForwardRefExoticComponent<
	ITabs & RefAttributes<HTMLDivElement>
> & {
	Item: typeof TabItem;
};
