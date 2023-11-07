import { InputHTMLAttributes, ReactNode } from "react";

export type TStatus = "normal" | "success" | "warning" | "error";

export type TValue = InputHTMLAttributes<HTMLInputElement>["value"];

export type TOption = {
	label: ReactNode;
	value: TValue;
	disabled?: boolean;
};

export type TOptions = (TOption | string | number)[];

export type TValidate = {
	status?: TStatus;
	message?: string;
};
