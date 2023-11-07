import { HTMLAttributes, ReactNode } from "react";

export interface Props {
	children?: ReactNode;
}

export interface IOption extends HTMLAttributes<HTMLDivElement> {
	active?: boolean;
	disabled?: boolean;
	children?: ReactNode;
}
