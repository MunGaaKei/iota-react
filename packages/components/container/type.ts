import { ReactNode } from "react";

export interface Props {
	layout?: "default" | "menu";
	breakpoint?: number;
	sider?: ReactNode;
	header?: ReactNode;
	footer?: ReactNode;
	children?: ReactNode;
	collapsed?: boolean;
	drawer?: boolean;
	onToggle?: (collapsed?: boolean) => void;
}

export type PropsSider = {
	collapsed?: boolean;
	mini?: boolean;
	children?: ReactNode;
	onHide?: () => void;
};

export type PropsArea = {
	children?: ReactNode;
	name: string;
};
