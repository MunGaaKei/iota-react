import { TValue } from "@p/type";
import {
	ChangeEvent,
	InputHTMLAttributes,
	ReactNode,
	TextareaHTMLAttributes,
} from "react";

export interface PropsBaseInput {
	label?: ReactNode;
	prepend?: ReactNode;
	append?: ReactNode;
	labelInline?: boolean;
	form?: string;
	message?: ReactNode;
	status?: "normal" | "error" | "warning" | "success";
	input?: JSX.Element | Element;
	onEnter?: () => void;
	onChange?: (value: TValue, e: ChangeEvent<HTMLInputElement>) => void;
}

export interface PropsInput
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">,
		PropsBaseInput {}

export interface PropsTextarea
	extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onChange">,
		PropsBaseInput {}

export interface PropsDatePicker extends PropsBaseInput {}
