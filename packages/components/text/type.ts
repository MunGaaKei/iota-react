import { CSSProperties, ReactNode } from "react";

export interface Props {
	as?: keyof JSX.IntrinsicElements;
	size?: string | number;
	decoration?: string;
	weight?: string | number;
	gradient?: string[];
	highlight?: string | string[];
	style?: CSSProperties;
	className?: string;
	children?: ReactNode;
}