import { FC, HTMLAttributes, ReactNode } from "react";
import { IButton } from "../button/type";
import useModal from "./useModal";

export interface IModal extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
	visible?: boolean;
	title?: ReactNode;
	footer?: ReactNode;
	closable?: boolean;
	hideCloseButton?: boolean;
	hideBackdrop?: boolean;
	backdropClosable?: boolean;
	width?: string | number;
	height?: string | number;
	customized?: boolean;
	fixed?: boolean;
	shadow?: boolean;
	okButtonProps?: IButton;
	cancelButtonProps?: IButton;
	footerLeft?: ReactNode;
	onVisibleChange?: (visible: boolean) => void;
	onOk?: () => void;
	onClose?: () => void;
}

export interface CompositionModal extends FC<IModal> {
	useModal: typeof useModal;
}

export interface IModalContent
	extends Pick<
		IModal,
		| "title"
		| "footer"
		| "hideCloseButton"
		| "okButtonProps"
		| "cancelButtonProps"
		| "children"
		| "footerLeft"
		| "onOk"
		| "onClose"
	> {}

export interface RefHookModal {
	update: (props: IModal) => void;
}
