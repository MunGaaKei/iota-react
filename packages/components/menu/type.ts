import {
	CSSProperties,
	ForwardRefExoticComponent,
	MouseEvent,
	ReactNode,
	RefAttributes,
} from "react";
import { LinkProps } from "react-router-dom";

export type TMenuHeader = {
	style?: CSSProperties;
	children: ReactNode;
	onClick?: (e: MouseEvent<HTMLElement>) => void;
} & Pick<TMenuItem, "as" | "href">;

export type TMenuItem = {
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
	children?: TMenuItem[];
	expanded?: boolean;
	disabled?: boolean;
};

export interface Props {
	items: TMenuItem[];
	depth?: number;
	selectable?: boolean;
	round?: boolean;
	ripple?: boolean;
	style?: CSSProperties;
	onItemClick?: (item: TMenuItem, e: MouseEvent<HTMLElement>) => void;
}
