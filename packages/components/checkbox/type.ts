import type { TOption, TStatus, TValue } from "@p/type";
import { ChangeEvent, InputHTMLAttributes, ReactNode } from "react";

export interface Props {
	label?: ReactNode;
	name?: string;
	options: TOption[] | (string | number)[];
	value?: TValue[];
	type?: "default" | "switch" | "button";
	optionInline?: boolean;
	labelInline?: boolean;
	disabled?: boolean;
	form?: string;
	status?: TStatus;
	message?: string;
	className?: string;
	onChange?: (
		value?: TValue[],
		option?: TOption,
		e?: ChangeEvent<HTMLInputElement>
	) => void;
}

export interface PropsItem
	extends Omit<InputHTMLAttributes<HTMLElement>, "value" | "onChange"> {
	type?: "default" | "switch" | "button";
	label?: ReactNode;
	value?: boolean;
	status?: TStatus;
	message?: string;
	onChange?: (value?: boolean, e?: ChangeEvent<HTMLInputElement>) => void;
}
