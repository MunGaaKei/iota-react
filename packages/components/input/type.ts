import { TValue } from "@p/type";
import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

export type PropsInput = {
	label?: ReactNode | string;
	prefix?: ReactNode;
	suffix?: ReactNode;
	labelInline?: boolean;
	form?: string;
	message?: string | ReactNode;
	status?: "normal" | "error" | "warning" | "success";
	onEnter?: () => void;
	onChange?: (value: TValue, e: ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLElement>;

export type PropsTextarea = {};
