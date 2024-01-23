import { BaseInput, TOption, TOptions, TValue } from "@p/type";
import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

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
	filterPlaceholder?: string;
	empty?: ReactNode;
	onSelect?: (v?: TValue, option?: TOption) => void;
	onChange?: (v: TValue) => void;
}

export interface ISelectOptions
	extends Pick<
		ISelect,
		"multiple" | "empty" | "filter" | "filterPlaceholder" | "onSelect"
	> {
	value?: TValue;
	options: TOption[];
	onFilter?: (e: ChangeEvent<HTMLInputElement>) => void;
}
