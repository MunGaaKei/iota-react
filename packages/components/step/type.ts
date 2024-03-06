import { CSSProperties, ReactNode } from "react";

export interface IStep {
	active?: number;
	icon?: (i: number, status?: string) => ReactNode;
	vertical?: boolean;
	style?: CSSProperties;
	className?: string;
	divider?: ReactNode;
	children?: ReactNode;
	onClick?: (i: number) => void;
}

export interface IStepItem extends IStep {
	index?: number;
	title?: ReactNode;
}
