import { HTMLAttributes } from "react";
import { FormStore } from "./useForm";

export interface Props extends HTMLAttributes<HTMLFormElement> {
	form?: FormStore;
	rules?: { [key: string]: (value: any) => string | boolean };
	initialValues?: any;
	width?: string | number;
}
