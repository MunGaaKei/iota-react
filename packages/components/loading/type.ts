import { HTMLAttributes, ReactNode } from "react";

export interface Props extends HTMLAttributes<HTMLDivElement> {
	icon?: ReactNode;
	text?: ReactNode;
	absolute?: boolean;
}
