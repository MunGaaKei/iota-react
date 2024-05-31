import { HTMLAttributes, ReactNode } from "react";
import { IFormInstance } from "./useForm";

export type TValidator = (value: any, form: IFormInstance) => string | boolean;

export interface IForm extends HTMLAttributes<HTMLFormElement> {
	form?: IFormInstance;
	rules?: {
		[key: string]: TValidator;
	};
	initialValues?: Record<string, any>;
	width?: string | number;
}

export interface IField {
	name?: string;
	children?: ReactNode;
}
