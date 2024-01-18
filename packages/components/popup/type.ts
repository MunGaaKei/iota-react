import { TPosition } from "@p/js/type";
import { CSSProperties, ReactNode } from "react";

export interface IPopup {
	visible?: boolean;
	content?: ReactNode;
	trigger?: "hover" | "click" | "focus" | "none";
	gap?: number;
	offset?: number;
	fixed?: boolean;
	position?: TPosition;
	showDelay?: number;
	hideDelay?: number;
	touchable?: boolean;
	fitWidth?: boolean;
	style?: CSSProperties;
	children?: ReactNode;
	getContainer?: () => HTMLElement;
	onVisibleChange?: (visible: boolean) => void;
}
