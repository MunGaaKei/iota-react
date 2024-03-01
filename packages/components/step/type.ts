import { CSSProperties, ReactNode } from "react";

export interface IStep {
	active?: number;
	vertical?: boolean;
	divider?: ReactNode;
	style?: CSSProperties;
	className?: string;
	children?: ReactNode;
	onChange?: (i?: number) => void;
}

export interface IStepItem {
	active?: boolean;
	icon?: (i: number, active: boolean) => ReactNode;
	style?: CSSProperties;
	className?: string;
	children?: ReactNode;
}
