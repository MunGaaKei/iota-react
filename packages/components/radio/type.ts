import { TOption, TStatus, TValue } from "@p/type";
import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

export interface PropsItem
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	type?: "default" | "button";
	onChange?: (value?: TValue, e?: ChangeEvent) => void;
}

export interface Props extends PropsItem {
	label?: ReactNode;
	options: TOption[] | (number | string)[];
	optionInline?: boolean;
	labelInline?: boolean;
	status?: TStatus;
	message?: string;
}
