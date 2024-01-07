import { CSSProperties, MouseEvent, ReactNode } from "react";

export interface Props {
	active?: boolean;
	loading?: boolean;
	icon?: ReactNode;
	className?: string;
	style?: CSSProperties;
	onClick?: (e: MouseEvent) => void;
}
