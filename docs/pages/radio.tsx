import { Radio } from "@p";
import { useState } from "react";

export default function Page() {
	const [value, setValue] = useState("双城");

	return (
		<>
			<Radio
				type='button'
				value={value}
				options={["双城", "破军", "龙战于野"]}
				onChange={setValue}
			/>
		</>
	);
}
