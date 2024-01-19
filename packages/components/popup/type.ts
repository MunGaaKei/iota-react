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
	arrow?: boolean;
	align?: "start" | "center" | "end";
	showDelay?: number;
	hideDelay?: number;
	touchable?: boolean;
	fitWidth?: boolean;
	style?: CSSProperties;
	children?: ReactNode;
	className?: string;
	getContainer?: () => HTMLElement;
	onVisibleChange?: (visible: boolean) => void;
}

export interface IPopupContent
	extends Pick<
		IPopup,
		"getContainer" | "arrow" | "className" | "style" | "children"
	> {
	arrowStyle?: CSSProperties;
}
