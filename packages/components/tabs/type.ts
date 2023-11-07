import { HTMLAttributes, ReactNode } from "react";

export interface Props extends HTMLAttributes<HTMLDivElement> {
	active?: string | number;
	prepend?: ReactNode;
	append?: ReactNode;
	vertical?: boolean;
	lazyload?: boolean;
	bar?: boolean;
}
