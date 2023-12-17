import { CSSProperties, ReactNode } from "react";

export interface Props {
	visible?: boolean;
	content?: ReactNode;
	contentClass?: string;
	dot?: boolean;
	dotSize?: string | number;
	className?: string;
	style?: CSSProperties;
	children?: ReactNode;
}
