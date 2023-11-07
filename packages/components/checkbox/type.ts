import type { TOption, TValidate, TValue } from "@p/type";
import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

export interface Props
	extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange">,
		TValidate {
	label?: ReactNode;
	options: TOption[] | (string | number)[];
	type?: "default" | "switch" | "button";
	optionInline?: boolean;
	labelInline?: boolean;
	form?: string;
	className?: string;
	onChange?: (
		value?: TValue[],
		option?: TOption,
		e?: ChangeEvent<HTMLInputElement>
	) => void;
}

export interface PropsItem
	extends Omit<InputHTMLAttributes<HTMLElement>, "value" | "onChange">,
		TValidate {
	type?: "default" | "switch" | "button";
	label?: ReactNode;
	value?: boolean;
	onChange?: (value?: boolean, e?: ChangeEvent<HTMLInputElement>) => void;
}
