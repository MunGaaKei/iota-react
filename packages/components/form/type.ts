import { HTMLAttributes, ReactNode } from "react";
import { IFormHandler } from "./useForm";

export interface IForm extends HTMLAttributes<HTMLFormElement> {
	form?: IFormHandler;
	rules?: { [key: string]: (value: any) => string | boolean };
	initialValues?: any;
	width?: string | number;
}

export interface IField {
	name?: string;
	children?: ReactNode;
}
