import {
	CSSProperties,
	ForwardRefExoticComponent,
	MouseEvent,
	ReactNode,
	RefAttributes,
} from "react";
import { LinkProps } from "react-router-dom";

export type TTreeHeader = {
	active?: boolean;
	style?: CSSProperties;
	children: ReactNode;
	onClick?: (e: MouseEvent<HTMLElement>) => void;
} & Pick<TTreeItem, "as" | "href">;

export type TTreeItem = {
	key?: string;
	as?:
		| "a"
		| "button"
		| ForwardRefExoticComponent<
				LinkProps & RefAttributes<HTMLAnchorElement>
		  >;
	type?: "item" | "title" | string;
	title: string | ReactNode;
	icon?: ReactNode;
	href?: string;
	children?: TTreeItem[];
	active?: boolean;
	expanded?: boolean;
	disabled?: boolean;
};

export interface Props {
	items: TTreeItem[];
	depth?: number;
	selectable?: boolean;
	round?: boolean;
	active?: string[];
	ripple?: boolean;
	style?: CSSProperties;
	onItemClick?: (item: TTreeItem, e: MouseEvent<HTMLElement>) => void;
}
