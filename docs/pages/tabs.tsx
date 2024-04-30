import { Image, Tabs } from "@p";

export default function Page() {
	return (
		<>
			<Tabs active={0} type='line'>
				{[...new Array(13).keys()].map((i) => (
					<Tabs.Item key={i} title={`title ${i + 1}`}>
						<div className='pd-8'>{`content ${i + 1}`}</div>
					</Tabs.Item>
				))}
				<Tabs.Item title='cached' keepalive>
					<Image src='https://via.placeholder.com/150' />
				</Tabs.Item>
			</Tabs>
		</>
	);
}
