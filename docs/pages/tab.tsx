import { Tabs } from "@p";

export default function Page() {
	return (
		<>
			<Tabs active={1}>
				<Tabs.Item title='123'>1</Tabs.Item>
				<Tabs.Item title={<>sdf</>}>2</Tabs.Item>
			</Tabs>
		</>
	);
}
