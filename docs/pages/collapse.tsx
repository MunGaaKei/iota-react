import { Collapse } from "@p";

export default function Page(params) {
	return (
		<>
			<Collapse>
				<Collapse.Item title={<>123</>}>content</Collapse.Item>
				<Collapse.Item title='456'>content</Collapse.Item>
				<Collapse.Item title='123312'>content</Collapse.Item>
			</Collapse>
		</>
	);
}
