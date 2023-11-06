import { TOption, TOptions, TValidate, TValue } from "@p/type";
import { InputHTMLAttributes, ReactNode } from "react";

export interface Props
	extends Omit<
			InputHTMLAttributes<HTMLInputElement>,
			"value" | "onSelect" | "onChange"
		>,
		TValidate {
	label?: ReactNode;
	value?: TValue;
	options: TOptions;
	multiple?: boolean;
	prepend?: ReactNode;
	append?: ReactNode;
	labelInline?: boolean;
	clear?: boolean;
	onSelect?: (v?: TValue, option?: TOption) => void;
	onChange?: (v: TValue) => void;
}
