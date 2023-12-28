import { HTMLAttributes, ReactNode } from "react";

export interface Props extends HTMLAttributes<HTMLDivElement> {
	visible?: boolean;
	position?: "top" | "left" | "right" | "bottom";
	header?: ReactNode;
	footer?: ReactNode;
	hideCloseButton?: boolean;
	backdropClosable?: boolean;
	onClose?: (visible?: boolean) => void;
}
