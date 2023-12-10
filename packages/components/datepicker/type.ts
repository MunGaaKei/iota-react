import { BaseInput } from "@p/type";
import { ReactNode } from "react";
import { Props as InputProps } from "../input/type";
import { Props as PopupProps } from "../popup/type";

export interface Props extends BaseInput, InputProps, Omit<BaseDates, "value"> {
	popupProps?: PopupProps;
}

export interface BaseDates {
	value?: any;
	format?: string;
	weeks?: ReactNode[];
	range?: string[];
	renderDate?: (date?: number) => ReactNode;
	renderWeek?: (week?: ReactNode) => ReactNode;
	renderMonth?: (month?: number) => ReactNode;
	renderYear?: (year?: number) => ReactNode;
}
