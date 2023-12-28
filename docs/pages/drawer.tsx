import { Button, Drawer } from "@p";
import { useState } from "react";

export default function Page() {
	const [visible, setVisible] = useState(false);

	return (
		<>
			<Button onClick={() => setVisible(true)}>打开</Button>
			<Drawer
				position='right'
				visible={visible}
				header={<h4>标题</h4>}
				onClose={() => setVisible(false)}
			>
				<div style={{ width: 240 }}>✌️✌️</div>
			</Drawer>
		</>
	);
}
