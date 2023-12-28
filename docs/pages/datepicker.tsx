import { Datepicker } from "@p";
import { useReactive } from "ahooks";

export default function Page() {
	const state = useReactive({
		date: undefined,
	});

	return (
		<>
			<Datepicker
				value={state.date}
				onChange={(v: any) => (state.date = v)}
				style={{ width: 240 }}
			/>
		</>
	);
}
