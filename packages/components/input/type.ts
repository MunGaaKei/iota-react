import { TValue } from "@p/type";
import {
	ChangeEvent,
	InputHTMLAttributes,
	ReactNode,
	TextareaHTMLAttributes,
} from "react";

export type PropsInput = {
	label?: ReactNode;
	prefix?: ReactNode;
	suffix?: ReactNode;
	labelInline?: boolean;
	form?: string;
	message?: ReactNode;
	status?: "normal" | "error" | "warning" | "success";
	onEnter?: () => void;
	onChange?: (
		value: TValue,
		e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => void;
} & InputHTMLAttributes<HTMLInputElement> &
	TextareaHTMLAttributes<HTMLTextAreaElement>;

export type PropsTextarea = {};
