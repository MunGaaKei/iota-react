import Pain from "@d/assets/pain.jpg";
import Sasuke from "@d/assets/sasuke.jpg";
import { Button, usePreview } from "@p";

export default function Page() {
	const preview = usePreview();
	const handlePreview = () =>
		preview({
			items: [
				{
					src: Sasuke,
				},
				Pain,
				"https://www.pwithe.com/Public/Upload/download/20170211/589ebf8e5bb13.pdf",
			],
		});

	return (
		<>
			<Button onClick={handlePreview}>预览</Button>
		</>
	);
}