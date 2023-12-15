import { CSSProperties, ReactNode } from "react";

export interface Props {
	hasPrev?: boolean;
	hasNext?: boolean;
	initialOffset?: number;
	style?: CSSProperties;
	className?: string;
	children?: ReactNode;
	onLoadMore?: (isNext?: boolean) => void;
}
