import {
	CSSProperties,
	ChangeEvent,
	InputHTMLAttributes,
	ReactNode,
} from "react";

export type TStatus = "normal" | "success" | "warning" | "error";

export type TValue = InputHTMLAttributes<HTMLInputElement>["value"];

export type BaseElement = {
	style?: CSSProperties;
	className?: string;
	children?: ReactNode;
};

export type TOption = {
	label: ReactNode;
	value: any;
	disabled?: boolean;
};

export type TOptions = (TOption | string | number)[];

export type TValidate = {
	status?: TStatus;
	message?: ReactNode;
};

export interface BaseInput extends TValidate {
	label?: ReactNode;
	value?: any;
	labelInline?: boolean;
	clear?: boolean;
	onChange?: (
		value?: any,
		e?: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
	onEnter?: () => void;
}

export type TTimeout = ReturnType<typeof setTimeout>;
