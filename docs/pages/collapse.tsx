import { Collapse } from "@p";

export default function Page(params) {
	return (
		<>
			<Collapse>
				<Collapse.Item title={<>窗外的麻雀</>}>
					在电线杆上多嘴
				</Collapse.Item>
				<Collapse.Item title='你说这一句' disabled>
					很有夏天的感觉
				</Collapse.Item>
				<Collapse.Item title='手中的铅笔'>在纸上来来回回</Collapse.Item>
			</Collapse>
		</>
	);
}
