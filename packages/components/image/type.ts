import { HTMLAttributes, ReactNode } from "react";

export interface IImage extends HTMLAttributes<HTMLImageElement> {
	src?: string;
	alt?: string;
	round?: boolean;
	size?: string | number;
	initSize?: string | number;
	lazyload?: boolean;
	fallback?: ReactNode;
	fit?: any;
}

export interface IImageList {
	items: string[];
	gap?: number | string;
	round?: boolean;
	lazyload?: boolean;
}
