import {
	CSSProperties,
	ChangeEvent,
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
	expanded?: boolean;
	disabled?: boolean;
	parent?: ITreeItem;
}

export interface PropsTreeItem extends Omit<ITree, "items"> {
	index?: number;
	item: ITreeItem;
}

export interface ITree {
	items: ITreeItem[];
	parent?: ITreeItem;
	depth?: number;
	keyProp?: string;
	selectable?: boolean;
	selected?: string;
	checkable?: boolean;
	checked?: string[];
	round?: boolean;
	ripple?: boolean;
	style?: CSSProperties;
	className?: string;
	onItemClick?: (item: ITreeItem, e: MouseEvent<HTMLElement>) => void;
	onItemSelect?: (key: string, item: ITreeItem) => void;
	onItemCheck?: (
		item: ITreeItem,
		checked: boolean,
		e?: ChangeEvent<HTMLInputElement>
	) => void;
}
