import { Position } from "@p/js/type";
import { CSSProperties, ReactNode } from "react";

export interface Props {
	visible?: boolean;
	content?: ReactNode;
	trigger?: "hover" | "click" | "focus";
	gap?: number;
	offset?: number;
	fixed?: boolean;
	position?: Position;
	showDelay?: number;
	hideDelay?: number;
	touchable?: boolean;
	fitWidth?: boolean;
	style?: CSSProperties;
	children?: ReactNode;
	getContainer?: () => HTMLElement;
	onVisibleChange?: (visible?: boolean) => void;
}
