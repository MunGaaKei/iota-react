import { useReactive } from "ahooks";
import Input from "../input";
import Popup from "../popup";
import { Panel } from "./dates";
import "./index.scss";
import { Props } from "./type";

const Datepicker = (props: Props): JSX.Element => {
	const {
		value,
		status,
		message,
		weeks,
		format,
		renderDate,
		renderWeek,
		renderMonth,
		renderYear,
		popupProps,
		...restProps
	} = props;

	const state = useReactive({
		value,
		status,
		message,
		visible: false,
	});

	const { value: val, message: msg, status: sts } = state;

	return (
		<Popup
			trigger='click'
			position='bottom'
			content={
				<Panel
					weeks={weeks}
					format={format}
					renderDate={renderDate}
					renderWeek={renderWeek}
					renderMonth={renderMonth}
					renderYear={renderYear}
				/>
			}
			{...popupProps}
		>
			<Input value={val} message={msg} status={sts} {...restProps} />
		</Popup>
	);
};

export default Datepicker;
