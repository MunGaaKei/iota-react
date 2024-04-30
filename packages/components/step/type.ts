import { CSSProperties, ReactNode } from "react";

export interface IStep {
	active?: number;
	vertical?: boolean;
	style?: CSSProperties;
	className?: string;
	divider?: ReactNode;
	children?: ReactNode;
	renderIcon?: (i: number, status?: string) => ReactNode;
	onClick?: (i: number) => void;
}

export interface IStepItem extends IStep {
	index?: number;
	title?: ReactNode;
}
