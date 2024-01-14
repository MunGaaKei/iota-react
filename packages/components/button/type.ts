import {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	ForwardRefExoticComponent,
	ReactNode,
	RefAttributes,
} from "react";
import { LinkProps } from "react-router-dom";

interface BaseProps {
	as?:
		| "a"
		| "button"
		| ForwardRefExoticComponent<
				LinkProps & RefAttributes<HTMLAnchorElement>
		  >;
	children?: ReactNode | string;
	className?: string;
	loading?: boolean;
	flat?: boolean;
	outline?: boolean;
	square?: boolean;
	size?: "small" | "normal" | "large" | "extreme";
	disabled?: boolean;
	block?: boolean;
	round?: boolean;
	ripple?: boolean;
}

export type Props = BaseProps &
	Omit<ButtonHTMLAttributes<HTMLElement>, "type"> &
	AnchorHTMLAttributes<HTMLElement>;

export interface PropsToggle extends Props {
	active?: boolean;
	activeClass?: string;
	after?: ReactNode;
	disabled?: boolean;
	onToggle?: (active?: boolean) => void;
}
