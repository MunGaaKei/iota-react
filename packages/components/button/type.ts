import {
	AnchorHTMLAttributes,
	ButtonHTMLAttributes,
	ForwardRefExoticComponent,
	ReactNode,
	RefAttributes,
} from "react";
import { LinkProps } from "react-router-dom";
import Toggle from "./toggle";

interface BaseButtonProps {
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
	secondary?: boolean;
}

export interface IButton
	extends BaseButtonProps,
		Omit<ButtonHTMLAttributes<HTMLElement>, "type">,
		AnchorHTMLAttributes<HTMLElement> {}

export interface IButtonToggle extends IButton {
	active?: boolean;
	activeClass?: string;
	after?: ReactNode;
	disabled?: boolean;
	onToggle?: (active: boolean) => void;
}

export interface CompositionButton
	extends ForwardRefExoticComponent<IButton & RefAttributes<HTMLElement>> {
	Toggle: typeof Toggle;
}
