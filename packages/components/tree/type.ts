import {
	CSSProperties,
	ForwardRefExoticComponent,
	MouseEvent,
	ReactNode,
	RefAttributes,
} from "react";
import { LinkProps } from "react-router-dom";

export interface ITreeHeader extends Pick<ITreeItem, "as" | "href"> {
	selected?: boolean;
	style?: CSSProperties;
	children: ReactNode;
	onClick?: (e: MouseEvent<HTMLElement>) => void;
}

export interface ITreeItem {
	as?:
		| "a"
		| "button"
		| ForwardRefExoticComponent<
				LinkProps & RefAttributes<HTMLAnchorElement>
		  >;
	key?: string;
	type?: "item" | "title" | string;
	title: string | ReactNode;
	icon?: ReactNode;
	href?: string;
	children?: ITreeItem[];
	selected?: boolean;
	checked?: boolean;
	expanded?: boolean;
	disabled?: boolean;
}

export interface PropsTreeItem extends Omit<ITree, "items"> {
	index?: number;
	item: ITreeItem;
}

export interface ITree {
	items: ITreeItem[];
	depth?: number;
	keyPrefix?: string;
	selectable?: boolean;
	selected?: string[];
	checkable?: boolean;
	round?: boolean;
	ripple?: boolean;
	style?: CSSProperties;
	className?: string;
	onItemClick?: (item: ITreeItem, e: MouseEvent<HTMLElement>) => void;
	onItemSelect?: (key: string) => void;
	onItemCheck?: (
		item: ITreeItem,
		checked: boolean,
		e?: MouseEvent<HTMLInputElement>
	) => void;
}
