import {
	CSSProperties,
	ForwardRefExoticComponent,
	ReactNode,
	RefAttributes,
} from "react";
import Item from "./item";

export interface IArea {
	layout?: "naruto" | "sasuke" | "goku";
	gap?: number | string;
	style?: CSSProperties;
	className?: string;
	children?: ReactNode;
	onToggle?: (collapsed?: boolean) => void;
}

export interface CompositionArea
	extends ForwardRefExoticComponent<IArea & RefAttributes<HTMLDivElement>> {
	Item: typeof Item;
}
