import { BaseInput } from "@p/type";
import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

export interface IInputContainer {
	label?: ReactNode;
	className?: string;
	labelInline?: boolean;
	children?: ReactNode;
}

export interface Props
	extends BaseInput,
		Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	prepend?: ReactNode;
	append?: ReactNode;
}

export interface PropsTextarea
	extends BaseInput,
		Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange"> {}
