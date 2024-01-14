import { formatTime } from "@p/js/utils";
import { useMemo } from "react";
import Text from "./text";
import { TextTime } from "./type";

export default function Number(props: TextTime) {
	const { time, zero, units, ...restProps } = props;

	const text = useMemo(() => {
		if (time === undefined) return "";

		return formatTime(time, {
			zero,
			units,
		});
	}, [time]);

	return <Text {...restProps}>{text}</Text>;
}
