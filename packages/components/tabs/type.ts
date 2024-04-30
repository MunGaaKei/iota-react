import {
	ForwardRefExoticComponent,
	HTMLAttributes,
	ReactNode,
	Ref,
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
	items?: ITabItem[];
	type?: "default" | "line";
	prepend?: ReactNode;
	append?: ReactNode;
	vertical?: boolean;
	hideMore?: boolean;
	bar?: boolean;
	barClass?: string;
	toggable?: boolean;
	renderMore?: (moreTabs: ITabItem[]) => ReactNode;
	onTabChange?: (to?: TTabKey, from?: TTabKey) => void;
}

export interface RefTabs {
	open: (key: TTabKey) => void;
	close: (key: TTabKey) => void;
	navs: Ref<HTMLDivElement>;
}

export type CompositionTabs = ForwardRefExoticComponent<
	ITabs & RefAttributes<HTMLDivElement>
> & {
	Item: typeof TabItem;
};
