import { BaseElement } from "@p/type";
import { MouseEvent } from "react";

export interface Props extends BaseElement {
	position?: "fixed" | "absolute" | "sticky";
	left?: string | number;
	top?: string | number;
	right?: string | number;
	offset?: number;
	bottom?: string | number;
	getContainer?: () => HTMLElement | null;
}

export interface IToTop extends BaseElement {
	onClick?: (e: MouseEvent) => void;
}
