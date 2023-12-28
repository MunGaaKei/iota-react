import { HTMLAttributes, ReactNode } from "react";

export interface Props extends HTMLAttributes<HTMLImageElement> {
	src?: string;
	alt?: string;
	round?: boolean;
	size?: string | number;
	loading?: boolean;
	fallback?: ReactNode;
}
