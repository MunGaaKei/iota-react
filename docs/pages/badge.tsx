import { Badge, Button } from "@p";
import { useState } from "react";

export default function Page() {
	const [count, setCount] = useState(0);

	return (
		<>
			<Badge visible={count !== 0} content={count} contentClass='bg-red'>
				<Button onClick={() => setCount((n) => n + 1)}>badge</Button>
			</Badge>
			<br />
			<Button onClick={() => setCount(0)} className='bg-blue mt-12'>
				clear
			</Button>
		</>
	);
}
