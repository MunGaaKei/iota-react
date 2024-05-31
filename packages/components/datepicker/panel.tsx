import {
	KeyboardArrowLeftRound,
	KeyboardArrowRightRound,
} from "@ricons/material";
import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import dayjs, { Dayjs } from "dayjs";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import Icon from "../icon";
import InfiniteScroll from "../infinitescroll";
import Helpericon from "../utils/helpericon";
import Dates from "./dates";
import { IBaseDates } from "./type";

const MONTHS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const YearMonth = (
	props: IBaseDates & {
		onClick?: () => void;
	}
) => {
	const {
		value,
		unitMonth = "月",
		unitYear = "年",
		renderYear,
		renderMonth,
		onClick,
	} = props;

	return (
		<a className='i-datepicker-action' data-ripple onClick={onClick}>
			<span>{renderYear?.(value.year())}</span>
			{unitYear}
			<span>{renderMonth?.(value.month() + 1)}</span>
			{unitMonth}
		</a>
	);
};

const Panel = (props: IBaseDates) => {
	const {
		value,
		unitYear,
		unitMonth,
		renderDate,
		renderMonth = (m: ReactNode) => m,
		renderYear = (y: ReactNode) => y,
		disabledDate,
		onDateClick,
	} = props;

	const state = useReactive({
		today: value,
		month: value || dayjs(),
		selectedYear: dayjs(),
		years: [] as number[],
		selectable: false,
	});

	const $years = useRef<HTMLDivElement>(null);

	const handleOperateMonth = useCallback((next: boolean) => {
		state.month = state.month[next ? "add" : "subtract"](1, "month");
	}, []);

	const handleChangeDate = (date: Dayjs) => {
		if (date.isSame(state.today, "day")) return;

		if (!date.isSame(state.month, "month")) {
			state.month = date;
		}

		state.today = date;
		onDateClick?.(date);
	};

	const handleChangeMonth = (month: number) => {
		state.month = state.month
			.year(state.selectedYear.year())
			.month(month - 1);
		state.selectable = false;
	};

	const getMoreYears = useMemoizedFn((isNext) => {
		const range = 4;
		let time = range;
		const years: number[] = [];

		if (isNext) {
			const year = state.years.at(-1) || state.month.year();
			while (time--) {
				years.push(year + range - time);
			}
			state.years.push(...years);
		} else {
			const year = state.years.at(0) || state.month.year();
			while (time--) {
				years.unshift(year - range + time);
			}
			state.years.unshift(...years);
		}
	});

	useEffect(() => {
		if (!state.selectable) return;

		state.selectedYear = state.month;

		const years: number[] = [state.selectedYear.year()];

		state.years = years;
	}, [state.selectable]);

	useEffect(() => {
		state.today = value;
		state.month = value || dayjs();
	}, [value]);

	return (
		<div className='i-datepicker'>
			<div className='i-datepicker-units'>
				<YearMonth
					value={state.month}
					unitYear={unitYear}
					unitMonth={unitMonth}
					renderMonth={renderMonth}
					renderYear={renderYear}
					onClick={() => (state.selectable = true)}
				/>
				<a
					className='ml-auto i-datepicker-action'
					data-ripple
					onClick={() => handleOperateMonth(false)}
				>
					<Icon icon={<KeyboardArrowLeftRound />} />
				</a>
				<a
					className='i-datepicker-action'
					data-ripple
					onClick={() => handleOperateMonth(true)}
				>
					<Icon icon={<KeyboardArrowRightRound />} />
				</a>
			</div>

			<div
				className={classNames("i-datepicker-ym", {
					"i-datepicker-active": state.selectable,
				})}
			>
				<Helpericon
					active
					className='i-datepicker-close'
					onClick={() => (state.selectable = false)}
				/>

				{state.selectable && (
					<InfiniteScroll
						ref={$years}
						hasNext
						hasPrev
						initialOffset={1}
						className='i-datepicker-years'
						onLoadMore={getMoreYears}
					>
						{state.years.map((y) => (
							<a
								key={y}
								className={classNames("i-datepicker-year", {
									"i-datepicker-active":
										y === state.selectedYear.year(),
								})}
								onClick={() =>
									(state.selectedYear =
										state.selectedYear.year(y))
								}
							>
								{renderYear(y)}
							</a>
						))}
					</InfiniteScroll>
				)}

				<div className='i-datepicker-months'>
					{MONTHS.map((m) => {
						return (
							<a
								key={m}
								className={classNames("i-datepicker-month", {
									"i-datepicker-active":
										m === state.month.month() + 1,
								})}
								onClick={() => handleChangeMonth(m)}
							>
								{renderMonth(m)}
							</a>
						);
					})}
				</div>
			</div>

			<Dates
				value={state.today}
				month={state.month}
				disabledDate={disabledDate}
				onDateClick={handleChangeDate}
				renderDate={renderDate}
			/>
		</div>
	);
};

export default Panel;
