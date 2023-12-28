import { HTMLAttributes, ReactNode } from "react";

export interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	visible?: boolean;
	title?: ReactNode;
	closable?: boolean;
	hideCloseButton?: boolean;
	backdropClosable?: boolean;
	width?: string | number;
	height?: string | number;
	customized?: boolean;
	onClose?: (visible?: boolean) => void;
}

export interface PropsContent
	extends Pick<Props, "title" | "hideCloseButton" | "children"> {
	onHide: () => void;
}
