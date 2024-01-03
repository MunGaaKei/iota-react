import { CSSProperties, ReactNode } from "react";

export interface Props {
	as?: keyof JSX.IntrinsicElements;
	size?: string | number;
	decoration?: string;
	weight?: string | number;
	gradient?: string[];
	style?: CSSProperties;
	className?: string;
	children?: ReactNode;
}

export interface TextNumber extends Props {
	count?: number;
	to?: number;
	decimal?: number;
	thousand?: string;
	duration?: number;
	easing?: (x: number) => number;
}
