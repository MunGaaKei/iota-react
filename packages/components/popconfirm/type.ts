import { ReactNode } from "react";
import { IButton } from "../button/type";
import { IPopup } from "../popup/type";

export interface IPopconfirm extends IPopup {
	title?: ReactNode;
	okProps?: IButton;
	cancelProps?: IButton;
	onOk?: () => Promise<void> | void;
	onCancel?: () => Promise<void> | void;
}
