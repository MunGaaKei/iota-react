import { Button, Progress } from "@p";
import { MultipleStopRound } from "@ricons/material";
import { useState } from "react";

export default function Page() {
	const [value, setValue] = useState(0);

	return (
		<>
			<Progress
				className='mb-12'
				label={`${value.toFixed(0)}%`}
				value={value}
				onChange={setValue}
				cursor={() => <MultipleStopRound className='white ' />}
			/>
			<Progress
				className='mb-12'
				height={120}
				type='circle'
				value={value}
				onChange={setValue}
			/>
			<Button onClick={() => setValue((v) => v + 10)}>plus</Button>
			<Button className='ml-12' onClick={() => setValue((v) => v - 10)}>
				minus
			</Button>
		</>
	);
}
