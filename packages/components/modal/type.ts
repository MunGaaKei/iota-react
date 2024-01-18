import { HTMLAttributes, ReactNode } from "react";

export interface IModal extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	visible?: boolean;
	title?: ReactNode;
	closable?: boolean;
	hideCloseButton?: boolean;
	backdropClosable?: boolean;
	width?: string | number;
	height?: string | number;
	customized?: boolean;
	fixed?: boolean;
	onClose?: () => void;
}

export interface IModalContent
	extends Pick<IModal, "title" | "hideCloseButton" | "children"> {
	onHide: () => void;
}

export interface RefHookModal {
	update: (props?: IModal) => void;
}
