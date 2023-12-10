import { useReactive } from "ahooks";
import dayjs from "dayjs";
import { ReactNode, useMemo } from "react";
import { BaseDates } from "./type";

const Panel = (props) => {
	return (
		<div className='i-datepicker'>
			<Dates {...props} />
		</div>
	);
};

const Dates = (props: BaseDates) => {
	const {
		value = dayjs(),
		weeks = ["日", "一", "二", "三", "四", "五", "六"],
		renderDate = (n: number) => n,
		renderWeek = (w: ReactNode) => w,
		renderMonth = (m: number) => m,
		renderYear = (y: number) => y,
	} = props;

	const state = useReactive({
		today: value,
	});

	const dates = useMemo(() => {
		const { today } = state;
		const dates: any[] = [];

		const lastDateOfLastMonth = today.add(-1, "month").endOf("month");
		let { $W, $D } = lastDateOfLastMonth;
		if ($W !== 6) {
			const lastMonthDates = Array.from({ length: $W + 1 }).map(
				(whatever, i) => ({
					date: $D - $W + i,
					day: lastDateOfLastMonth.add(i - $W, "day"),
				})
			);
			dates.push(...lastMonthDates);
		}
		const lastDate = today.endOf("month");
		dates.push();

		console.log(dates);

		return [];
	}, [state.today]);

	return (
		<div className='i-datepicker-dates'>
			{weeks.map((week: ReactNode, i: number) => (
				<b key={i} className='i-datepicker-date'>
					{renderWeek(week)}
				</b>
			))}

			{dates.map((date: number, i: number) => (
				<div key={i} className='i-datepicker-date'>
					{renderDate(date)}
				</div>
			))}
		</div>
	);
};

export { Dates, Panel };
