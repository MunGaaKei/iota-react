import { HTMLAttributes, ReactNode } from "react";

export interface Props extends HTMLAttributes<HTMLElement> {
	icon: ReactNode;
	size?: string;
	rotate?: number;
}
