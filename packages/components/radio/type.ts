import { TOption, TStatus, TValue } from "@p/type";
import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

export interface IRadioItem
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	type?: "default" | "button";
	onChange?: (value?: TValue, e?: ChangeEvent) => void;
}

export interface IRadio extends IRadioItem {
	label?: ReactNode;
	options: TOption[] | (number | string)[];
	optionInline?: boolean;
	labelInline?: boolean;
	status?: TStatus;
	message?: string;
}
