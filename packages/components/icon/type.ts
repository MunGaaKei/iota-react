import { MouseEvent, ReactNode } from "react";

export interface Props {
	icon: ReactNode;
	size?: string;
	className?: string;
	onClick?: (e: MouseEvent<HTMLElement>) => void;
}
