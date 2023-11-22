import { Button, Dialog } from "@p";
import { useState } from "react";

export default function Page() {
	const [visible, setVisible] = useState(false);

	return (
		<>
			<Button onClick={() => setVisible(true)}>打开</Button>
			<Dialog visible={visible} onClose={() => setVisible(false)}>
				<div
					style={{
						width: 500,
						height: 200,
						maxWidth: "100%",
						backgroundImage:
							"linear-gradient(-225deg, rgb(119, 255, 210) 0%, rgb(98, 151, 219) 48%, rgb(30, 236, 255) 100%)",
					}}
				></div>
			</Dialog>
		</>
	);
}
