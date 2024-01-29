import {
	CSSProperties,
	ForwardRefExoticComponent,
	ReactNode,
	RefAttributes,
} from "react";
import Item from "./item";

export interface IArea {
	layout?: "naruto" | "sasuke" | "goku";
	configs?: {
		headerHeight?: string;
		contentWidth?: string;
		gap?: string | number;
	};
	style?: CSSProperties;
	className?: string;
	children?: ReactNode;
	onToggle?: (collapsed?: boolean) => void;
}

export interface IAreaItem {
	name?: string;
	style?: CSSProperties;
	className?: string;
	children?: ReactNode;
}

export interface CompositionArea
	extends ForwardRefExoticComponent<IArea & RefAttributes<HTMLDivElement>> {
	Item: typeof Item;
}
