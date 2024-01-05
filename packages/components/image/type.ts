import { HTMLAttributes, ReactNode } from "react";

export interface Props extends HTMLAttributes<HTMLImageElement> {
	src?: string;
	alt?: string;
	round?: boolean;
	size?: string | number;
	lazyload?: boolean;
	fallback?: ReactNode;
}

export interface ImageList {
	items: string[];
	gap?: number | string;
	round?: boolean;
	lazyload?: boolean;
}
