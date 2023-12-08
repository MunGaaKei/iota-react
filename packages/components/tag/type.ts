import { HTMLAttributes, MouseEvent } from "react";

export interface Props extends HTMLAttributes<HTMLSpanElement> {
	hideDot?: boolean;
	dotClass?: string;
	outline?: boolean;
	onClick?: (e?: MouseEvent) => void;
	onClose?: (e?: MouseEvent) => void;
}
