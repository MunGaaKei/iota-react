import { BaseInput, TOption, TOptions, TValue } from "@p/type";
import { InputHTMLAttributes, ReactNode } from "react";

export interface ISelect
	extends Omit<
			InputHTMLAttributes<HTMLInputElement>,
			"onSelect" | "onChange"
		>,
		BaseInput {
	options: TOptions;
	multiple?: boolean;
	prepend?: ReactNode;
	append?: ReactNode;
	hideClear?: boolean;
	max?: number;
	maxDisplay?: number;
	filter?: boolean | (() => boolean);
	empty?: ReactNode;
	onSelect?: (v?: TValue, option?: TOption) => void;
	onChange?: (v: TValue) => void;
}

export interface ISelectOptions {
	multiple?: boolean;
	value?: TValue;
	options: TOption[];
	maxDisplay?: number;
	filter?: boolean;
	empty?: ReactNode;
	onSelect?: (v: TValue, option: TOption) => void;
}

export interface IDisplayValues {
	values?: ReactNode[];
	max: number;
}
