import { BaseInput } from "@p/type";
import {
	CSSProperties,
	ChangeEvent,
	ForwardRefExoticComponent,
	InputHTMLAttributes,
	MouseEvent,
	ReactNode,
	RefAttributes,
	TextareaHTMLAttributes,
} from "react";
import Number from "./number";
import Range from "./range";
import Textarea from "./textarea";

export interface IInputContainer {
	label?: ReactNode;
	className?: string;
	labelInline?: boolean;
	children?: ReactNode;
	style?: CSSProperties;
}

export interface IInput
	extends BaseInput,
		Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
	prepend?: ReactNode;
	append?: ReactNode;
	hideVisible?: boolean;
}

export interface ITextarea
	extends BaseInput,
		Omit<
			TextareaHTMLAttributes<HTMLTextAreaElement>,
			"value" | "onChange"
		> {}

export interface IInputNumber
	extends BaseInput,
		Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
	value?: string | number;
	prepend?: ReactNode;
	append?: ReactNode;
	step?: number;
	min?: number;
	max?: number;
	thousand?: string;
	decimal?: number;
}

export interface IInputRange
	extends Omit<BaseInput, "value" | "onChange">,
		Omit<
			InputHTMLAttributes<HTMLInputElement>,
			"value" | "placeholder" | "onChange"
		> {
	value?: (number | string | undefined)[];
	placeholder?: string[];
	min?: number;
	max?: number;
	prepend?: ReactNode;
	append?: ReactNode;
	step?: number;
	thousand?: string;
	decimal?: number;
	onChange?: (
		value: (number | string | undefined)[],
		e?: ChangeEvent<HTMLInputElement> | MouseEvent<Element>
	) => void;
}

export type CompositionInput = ForwardRefExoticComponent<
	IInput & RefAttributes<HTMLInputElement>
> & {
	Textarea: typeof Textarea;
	Number: typeof Number;
	Range: typeof Range;
};
