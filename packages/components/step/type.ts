import { CSSProperties, ReactNode } from "react";

type TStepProp = {
	active?: number;
	icon?: (i: number, status?: string) => ReactNode;
	style?: CSSProperties;
	className?: string;
	children?: ReactNode;
};

export interface IStep extends TStepProp {
	vertical?: boolean;
}

export interface IStepItem extends TStepProp {
	index?: number;
	title?: ReactNode;
	divider?: ReactNode;
}
