import { MouseEvent } from "react";

export interface Props {
	icon: Element;
	size?: string;
	className?: string;
	onClick?: (e: MouseEvent<HTMLElement>) => void;
}
