import { CSSProperties, ReactNode } from "react";

export interface IIcon {
	icon: ReactNode;
	size?: string;
	rotate?: number;
	style?: CSSProperties;
	className?: string;
}
