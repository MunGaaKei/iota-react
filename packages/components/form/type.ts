import { CSSProperties, ReactNode } from "react";
import { FormStore } from "./useForm";

export interface Props {
	form?: FormStore;
	rules?: { [key: string]: (value: any) => string | boolean };
	initialValues?: any;
	width?: string | number;
	style?: CSSProperties;
	className?: string;
	children?: ReactNode;
}
