import { Image, Tabs } from "@p";

export default function Page() {
	return (
		<>
			<Tabs active='1'>
				{[...new Array(12).keys()].map((i) => (
					<Tabs.Item key={i} title={`title ${i}`}>
						<div className='pd-8'>{`content ${i}`}</div>
					</Tabs.Item>
				))}
				<Tabs.Item title='cached' keepalive>
					<Image src='https://via.placeholder.com/150' />
				</Tabs.Item>
			</Tabs>
		</>
	);
}
