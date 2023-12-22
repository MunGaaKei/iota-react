import { HTMLAttributes, MouseEvent } from "react";

export interface Props extends HTMLAttributes<HTMLSpanElement> {
	dot?: boolean;
	dotClass?: string;
	outline?: boolean;
	round?: boolean;
	size?: "small" | "normal" | "large" | "extreme";
	onClick?: (e?: MouseEvent) => void;
	onClose?: (e?: MouseEvent) => void;
}
