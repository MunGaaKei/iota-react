import { BaseInput, TOption, TOptions } from "@p/type";
import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

export interface ISelect
	extends Omit<
			InputHTMLAttributes<HTMLInputElement>,
			"value" | "onSelect" | "onChange"
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
	onSelect?: (v: any, option?: TOption) => void;
	onChange?: (v: any) => void;
}

export interface ISelectOptions
	extends Pick<
		ISelect,
		"multiple" | "empty" | "filter" | "filterPlaceholder" | "onSelect"
	> {
	value: any;
	options: TOption[];
	onFilter?: (e: ChangeEvent<HTMLInputElement>) => void;
}
