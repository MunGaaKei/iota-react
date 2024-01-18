import { BaseElement } from "@p/type";
import { ReactNode } from "react";

export interface ICard extends BaseElement {
	shadow?: boolean;
	border?: boolean;
	header?: ReactNode;
	footer?: ReactNode;
}
