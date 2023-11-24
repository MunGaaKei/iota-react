import { BaseInput, TOption, TOptions, TValue } from "@p/type";
import { InputHTMLAttributes, ReactNode } from "react";

export interface Props
	extends Omit<
			InputHTMLAttributes<HTMLInputElement>,
			"onSelect" | "onChange"
		>,
		BaseInput {
	options: TOptions;
	multiple?: boolean;
	prepend?: ReactNode;
	append?: ReactNode;
	clear?: boolean;
	max?: number;
	maxDisplay?: number;
	filter?: boolean | (() => boolean);
	onSelect?: (v?: TValue, option?: TOption) => void;
	onChange?: (v: TValue) => void;
}
