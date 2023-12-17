import { CSSProperties, ReactNode } from "react";

export interface Props {
	value?: number;
	height?: number | string;
	barClass?: string;
	draggable?: boolean;
	className?: string;
	style?: CSSProperties;
	button?: ReactNode;
	onChange?: (v: number) => void;
}
