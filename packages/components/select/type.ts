import { TOption, TStatus } from "@p/type";
import { InputHTMLAttributes, ReactNode } from "react";

export interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label?: ReactNode;
	options: TOption[];
	prepend?: ReactNode;
	append?: ReactNode;
	labelInline?: boolean;
	message?: string;
	status?: TStatus;
}
