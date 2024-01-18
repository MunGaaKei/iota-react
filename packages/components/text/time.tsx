import { formatTime } from "@p/js/utils";
import { useMemo } from "react";
import Text from "./text";
import { ITextTime } from "./type";

export default function Number(props: ITextTime) {
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
