import { Button, Progress } from "@p";
import { useState } from "react";

export default function Page() {
	const [value, setValue] = useState(0);

	return (
		<>
			<Progress value={value} onChange={setValue} />
			<Button onClick={() => setValue((v) => v + 10)}>plus</Button>
			<Button onClick={() => setValue((v) => v - 10)}>minus</Button>
		</>
	);
}
