import { BaseInput } from "@p/type";
import { Dayjs } from "dayjs";
import { ReactNode } from "react";
import { Props as InputProps } from "../input/type";
import { Props as PopupProps } from "../popup/type";

export interface IDatePicker
	extends BaseInput,
		InputProps,
		Omit<IBaseDates, "value"> {
	popupProps?: PopupProps;
}

export interface IBaseDates {
	value?: any;
	format?: string;
	weeks?: ReactNode[];
	range?: string[];
	unitYear?: ReactNode;
	unitMonth?: ReactNode;
	renderDate?: (date?: Dayjs) => ReactNode;
	renderWeek?: (week?: ReactNode) => ReactNode;
	renderMonth?: (month?: number) => ReactNode;
	renderYear?: (year?: number) => ReactNode;
	onDateClick?: (date: Dayjs) => void;
}
