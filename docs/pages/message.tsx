import { Button, Message } from "@p";

export default function Page() {
	return (
		<>
			<Button onClick={() => Message(Math.random())}>呼出</Button>
		</>
	);
}
