import { MouseEvent, ReactNode } from "react";

export interface IMessage {
	id?: string;
	content?: ReactNode;
	active?: boolean;
	duration?: number;
	gap?: number;
	offset?: string;
	max?: number;
	align?: "center" | "start" | "end";
	fromStart?: boolean;
	closable?: boolean;
	timer?: ReturnType<typeof setTimeout>;
	className?: string;
}

export interface IMessageItem {
	active?: boolean;
	content?: ReactNode;
	top?: number;
	className?: string;
	onClick?: (e: MouseEvent<Element>) => void;
}
