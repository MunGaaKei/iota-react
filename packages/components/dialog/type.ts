import { HTMLAttributes, ReactNode } from "react";

export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	visible?: boolean;
	title?: ReactNode;
	closable?: boolean;
	closeButton?: boolean;
	backdropClosable?: boolean;
	width?: string | number;
	height?: string | number;
	customized?: boolean;
	children?: ReactNode;
	onClose?: (visible?: boolean) => void;
}

export interface PropsContent
	extends Pick<Props, "title" | "closeButton" | "children"> {
	onHide: () => void;
}
