import { Button, Dropdown, Icon, Tag } from "@p";
import {
	KeyboardArrowDownRound,
	KeyboardCommandKeyRound,
	MoreHorizRound,
} from "@ricons/material";
import { useState } from "react";

export default function Page() {
	const [visible, setVisible] = useState(false);

	const SubMenu = (
		<>
			<Dropdown.Item type='option'>
				<span>剪切</span>
				<Tag size='small' className='bg-yellow-0'>
					<Icon icon={<KeyboardCommandKeyRound />} size='1.125em' />
					<span>X</span>
				</Tag>
			</Dropdown.Item>
			<Dropdown.Item type='option'>
				<span>删除</span>
				<Tag size='small' className='bg-red-0'>
					<Icon icon={<KeyboardCommandKeyRound />} size='1.125em' />
					<span>D</span>
				</Tag>
			</Dropdown.Item>
		</>
	);

	const Dropmenu = (
		<>
			<Dropdown.Item type='option'>
				<span>复制</span>
				<Tag size='small' className='bg-blue-0'>
					<Icon icon={<KeyboardCommandKeyRound />} size='1.125em' />
					<span>C</span>
				</Tag>
			</Dropdown.Item>
			<Dropdown.Item type='option' disabled>
				<span>粘贴</span>
				<Tag size='small' className='bg-blue-0'>
					<Icon icon={<KeyboardCommandKeyRound />} size='1.125em' />
					<span>V</span>
				</Tag>
			</Dropdown.Item>
			<Dropdown.Item type='option' more={SubMenu}>
				<span>更多</span>
				<Icon icon={<MoreHorizRound />} size='1.125em' />
			</Dropdown.Item>
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
				trigger='hover'
				width={160}
				onVisibleChange={setVisible}
				touchable
			>
				<Button>
					下拉菜单
					<Icon icon={<KeyboardArrowDownRound />} size='1.25em' />
				</Button>
			</Dropdown>
		</>
	);
}
