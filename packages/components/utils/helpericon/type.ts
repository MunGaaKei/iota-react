import { MouseEvent, ReactNode } from "react";

export interface Props {
	active?: boolean;
	loading?: boolean;
	icon?: ReactNode;
	className?: string;
	onClick?: (e: MouseEvent) => void;
}
