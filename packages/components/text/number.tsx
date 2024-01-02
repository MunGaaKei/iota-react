import { useMemo, useState } from "react";
import Text from "./text";
import { TextNumber } from "./type";

export default function Number(props: TextNumber) {
	const { count, to, decimal, thousand = ",", ...restProps } = props;
	const [n, setN] = useState(count);

	const number = useMemo(() => {
		let z = String(n);

		if (thousand) z = z.replace(/(\d)(?=(?:\d{3})+$)/g, `$1${thousand}`);

		return z;
	}, [to, thousand]);

	return <Text {...restProps}>{number}</Text>;
}
