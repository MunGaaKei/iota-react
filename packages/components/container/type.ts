import { ReactNode } from "react";

export type PropsSider = {
	children?: ReactNode;
	collapsed?: boolean;
};

export type PropsArea = {
	children?: ReactNode;
	name: string;
};

export interface Props extends PropsSider {
	layout?: "default" | "menu";
	breakpoint?: number;
	sider?: ReactNode;
	header?: ReactNode;
	footer?: ReactNode;
}
