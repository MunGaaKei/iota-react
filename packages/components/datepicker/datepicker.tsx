import { CalendarMonthTwotone } from "@ricons/material";
import { useReactive } from "ahooks";
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useMemo, useState } from "react";
import Icon from "../icon";
import Input from "../input";
import Popup from "../popup";
import "./index.css";
import Panel from "./panel";
import { IDatePicker } from "./type";

dayjs.extend(customParseFormat);

const FORMATTYPES = ["YYYY-MM-DD", "YYYY-M-D", "YYYY/MM/DD", "YYYY/M/D"];

const Datepicker = (props: IDatePicker): JSX.Element => {
	const {
		name,
		value,
		status,
		message,
		weeks,
		format = "YYYY-MM-DD",
		renderDate,
		renderWeek,
		renderMonth,
		renderYear,
		popupProps,
		disabledDate,
		onDateClick,
		onChange,
		onBlur,
		...restProps
	} = props;

	const state = useReactive({
		value,
		status,
		message,
	});

	const [active, setActive] = useState<boolean>(false);

	const dayJsValue = useMemo(() => {
		if (!state.value) return null;

		const date = dayjs(state.value as string, format, true);

		if (date.isValid()) return date;

		return null;
	}, [state.value]);

	const handleDateClick = (date: Dayjs) => {
		handleChange(date.format(format));
	};

	const handleChange = (v) => {
		Object.assign(state, {
			value: v,
			status,
			message,
		});

		onChange?.(v);
	};

	const handleBlur = (e) => {
		onBlur?.(e);

		if (!state.value) return;

		const date = dayjs(state.value as string, FORMATTYPES, true);

		if (date.isValid()) {
			handleChange(date.format(format));
			return;
		}

		handleChange("");
	};

	const { value: val, message: msg, status: sts } = state;

	return (
		<Popup
			visible={active}
			trigger='click'
			position='bottom'
			arrow={false}
			content={
				<Panel
					value={dayJsValue}
					weeks={weeks}
					renderDate={renderDate}
					renderWeek={renderWeek}
					renderMonth={renderMonth}
					renderYear={renderYear}
					disabledDate={disabledDate}
					onDateClick={handleDateClick}
				/>
			}
			{...popupProps}
			watchResize
			onVisibleChange={setActive}
		>
			<Input
				value={val}
				message={msg}
				status={sts}
				prepend={
					<Icon
						icon={<CalendarMonthTwotone />}
						className='i-datepicker-icon'
						size='1em'
					/>
				}
				onChange={handleChange}
				onBlur={handleBlur}
				{...restProps}
			/>
		</Popup>
	);
};

export default Datepicker;
