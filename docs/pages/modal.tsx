import { Button, Modal } from "@p";
import { useState } from "react";

export default function Page() {
	const [visible, setVisible] = useState(false);

	const { open, close, update } = Modal.useModal({
		title: "Use Modal",
		children: (
			<Button className='bg-blue' onClick={() => update()}>
				更新Title
			</Button>
		),
	});

	return (
		<>
			<Button onClick={() => setVisible(true)}>打开</Button>
			<Button className='mx-12 bg-black' onClick={open}>
				useModal
			</Button>
			<Modal visible={visible} onClose={() => setVisible(false)}>
				<div
					style={{
						width: 500,
						height: 200,
						maxWidth: "100%",
						backgroundImage:
							"linear-gradient(-225deg, rgb(119, 255, 210) 0%, rgb(98, 151, 219) 48%, rgb(30, 236, 255) 100%)",
					}}
				></div>
			</Modal>
		</>
	);
}
