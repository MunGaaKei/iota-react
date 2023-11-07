import { ReactNode } from "react";

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
}

export interface PropsItem {
	active?: boolean;
	content?: ReactNode;
	top?: number;
	onClick?: () => void;
}
