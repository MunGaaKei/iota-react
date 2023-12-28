import { Button, Dropdown, Icon, List } from "@p";
import {
	KeyboardArrowDownRound,
	KeyboardCommandKeyRound,
} from "@ricons/material";
import { useState } from "react";

export default function Page() {
	const [visible, setVisible] = useState(true);

	const Dropmenu = (
		<>
			<List.Item
				type='option'
				shortcut={
					<>
						<Icon icon={<KeyboardCommandKeyRound />} size='1em' />c
					</>
				}
			>
				复制
			</List.Item>
			<List.Item
				type='option'
				shortcut={
					<>
						<Icon icon={<KeyboardCommandKeyRound />} size='1em' />v
					</>
				}
			>
				粘贴
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
