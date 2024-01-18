import { animate, formatNumber } from "@p/js/utils";
import { useEffect, useMemo, useState } from "react";
import Text from "./text";
import { ITextNumber } from "./type";

export default function Number(props: ITextNumber) {
	const {
		count,
		to,
		decimal,
		thousand = ",",
		duration = 2400,
		easing,
		...restProps
	} = props;
	const [n, setN] = useState(count);

	const number = useMemo(() => {
		if (n === undefined) return;

		const z = n.toFixed(decimal);

		if (!thousand) return z;

		return formatNumber(n, { decimal, thousand });
	}, [n, thousand]);

	useEffect(() => {
		if (count === undefined || to === undefined) return;

		animate(count, to, duration, (v) => setN(count + v), easing);
	}, [to]);

	useEffect(() => setN(count), [count]);

	return <Text {...restProps}>{number}</Text>;
}
