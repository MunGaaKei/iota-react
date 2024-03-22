import { BaseInput } from "@p/type";
import { InputHTMLAttributes, ReactNode } from "react";

export interface IUpload
	extends BaseInput,
		Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
	action?: string;
	accept?: string;
	multiple?: boolean;
	directory?: boolean;
	limit?: number;
	mode?: "default" | "card";
	renderItem?: () => ReactNode;
	renderButton?: () => ReactNode;
	onUpload?: () => void;
}

export interface IFileItem {
	file?: File;
}
