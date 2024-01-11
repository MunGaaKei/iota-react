import {
	CSSProperties,
	ForwardRefExoticComponent,
	ReactNode,
	RefAttributes,
} from "react";
import Item from "./item";

export interface Props {
	layout?: "naruto" | "sasuke" | "goku";
	gap?: number | string;
	style?: CSSProperties;
	className?: string;
	children?: ReactNode;
	onToggle?: (collapsed?: boolean) => void;
}

export interface IArea
	extends ForwardRefExoticComponent<Props & RefAttributes<HTMLInputElement>> {
	Item: typeof Item;
}
