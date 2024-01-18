import { BaseInput } from "@p/type";
import { CSSProperties, ReactNode } from "react";

export interface IProgress
	extends Omit<BaseInput, "value" | "hideClear" | "onChange"> {
	name?: string;
	value?: number;
	digits?: number;
	height?: number;
	size?: number;
	barClass?: string;
	draggable?: boolean;
	type?: "line" | "circle";
	className?: string;
	style?: CSSProperties;
	cursor?: (v?: number) => ReactNode;
	onChange?: (v: number) => void;
}
