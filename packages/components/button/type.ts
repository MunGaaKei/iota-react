import {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	ForwardRefExoticComponent,
	ReactNode,
	RefAttributes,
} from "react";
import { LinkProps } from "react-router-dom";

interface BaseProps {
	tag?:
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
}

export type Props = BaseProps &
	Omit<ButtonHTMLAttributes<HTMLElement>, "type"> &
	AnchorHTMLAttributes<HTMLElement>;
