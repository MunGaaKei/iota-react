import { HTMLAttributes, ReactNode } from "react";

export interface Props {}

export interface IOption extends HTMLAttributes<HTMLDivElement> {
	active?: boolean;
	children?: ReactNode;
}
