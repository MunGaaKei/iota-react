import { Radio } from "@p";
import { useState } from "react";

export default function Page() {
	const [value, setValue] = useState(1);

	return (
		<>
			<Radio
				type='button'
				value={value}
				options={[1, 2, 3]}
				onChange={setValue}
			/>
		</>
	);
}
