import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import Footer from "./footer";
import Header from "./header";
import Sider from "./sider";

export interface Props {
	breakpoint?: number;
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

export interface ISider
	extends ForwardRefExoticComponent<
		PropsSider & RefAttributes<HTMLInputElement>
	> {
	iotaName?: string;
}

export interface IContainer
	extends ForwardRefExoticComponent<Props & RefAttributes<HTMLInputElement>> {
	Header: typeof Header;
	Sider: typeof Sider;
	Footer: typeof Footer;
}
