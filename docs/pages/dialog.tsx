import { Button, Dialog } from "@p";
import { useState } from "react";

export default function Page() {
	const [visible, setVisible] = useState(false);

	return (
		<>
			<Button onClick={() => setVisible(true)}>打开</Button>
			<Dialog visible={visible} onClose={() => setVisible(false)}>
				123
			</Dialog>
		</>
	);
}
