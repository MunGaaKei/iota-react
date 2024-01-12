import { Button, Modal } from "@p";
import { useState } from "react";

export default function Page() {
	const [visible, setVisible] = useState(false);

	const { open, update } = Modal.useModal();

	const handleUpdateModal = () => {
		update({
			title: "更新后: " + Math.random(),
		});
	};

	const handleOpen = () =>
		open({
			title: "Use Modal",
			children: (
				<div className='pd-12'>
					<Button className='bg-blue' onClick={handleUpdateModal}>
						更新Title
					</Button>
				</div>
			),
			onClose: () => {
				console.log("close callback");
			},
		});

	return (
		<>
			<Button onClick={() => setVisible(true)}>打开</Button>
			<Button className='mx-12 bg-black' onClick={handleOpen}>
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
