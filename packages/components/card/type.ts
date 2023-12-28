import { BaseElement } from "@p/type";
import { ReactNode } from "react";

export interface Props extends BaseElement {
	shadow?: boolean;
	header?: ReactNode;
	footer?: ReactNode;
}
