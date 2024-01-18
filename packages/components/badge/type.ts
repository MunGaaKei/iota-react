import { CSSProperties, ReactNode } from "react";

export interface IBadge {
	visible?: boolean;
	content?: ReactNode;
	contentClass?: string;
	dot?: boolean;
	dotSize?: string | number;
	round?: boolean;
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
}
