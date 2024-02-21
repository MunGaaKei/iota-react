import { HTMLAttributes, ReactNode } from "react";
import { IFormHandler } from "./useForm";

export type Tvalidator = (value: any, form?: IFormHandler) => string | boolean;

export interface IForm extends HTMLAttributes<HTMLFormElement> {
	form?: IFormHandler;
	rules?: {
		[key: string]: Tvalidator;
	};
	initialValues?: any;
	width?: string | number;
}

export interface IField {
	name?: string;
	children?: ReactNode;
}
