import { Button, Datepicker } from "@p";
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
			<Button className='bg-pink'>pink</Button>
			<Button className='bg-purple'>purple</Button>
			<Button className='bg-aqua'>aqua</Button>
			<Button className='bg-yellow'>yellow</Button>
		</>
	);
}
