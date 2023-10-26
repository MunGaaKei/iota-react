import { TValue } from "@p/type";
import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

type TInputStatus = {
	message?: string | ReactNode;
	status?: "normal" | "error" | "warning" | "success";
};

export type Props = {
	label?: ReactNode | string;
	prefix?: ReactNode;
	suffix?: ReactNode;
	labelInline?: boolean;
	form?: string;
	status?: TInputStatus;
	onEnter?: () => void;
	onChange?: (value: TValue, e: ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLElement>;
