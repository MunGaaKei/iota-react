import { Button, Dropdown, Icon, List, Tag } from "@p";
import {
	KeyboardArrowDownRound,
	KeyboardCommandKeyRound,
} from "@ricons/material";
import { useState } from "react";

export default function Page() {
	const [visible, setVisible] = useState(true);

	const Dropmenu = (
		<>
			<List.Item type='option'>
				<span>复制</span>
				<Tag size='small' className='bg-blue-0'>
					<Icon icon={<KeyboardCommandKeyRound />} size='1.125em' />
					<span>C</span>
				</Tag>
			</List.Item>
			<List.Item type='option'>
				<span>粘贴</span>
				<Tag size='small' className='bg-blue-0'>
					<Icon icon={<KeyboardCommandKeyRound />} size='1.125em' />
					<span>V</span>
				</Tag>
			</List.Item>
			<Button
				className='bg-grey mt-12'
				size='small'
				onClick={() => setVisible(false)}
			>
				取消
			</Button>
		</>
	);

	return (
		<>
			<Dropdown
				visible={visible}
				content={Dropmenu}
				width={160}
				onVisibleChange={setVisible}
			>
				<Button>
					下拉菜单
					<Icon icon={<KeyboardArrowDownRound />} size='1.25em' />
				</Button>
			</Dropdown>
		</>
	);
}
