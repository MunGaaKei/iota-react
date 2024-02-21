import { Button, Flex, Icon, List, Popup, Tag } from "@p";
import { KeyboardCommandKeyRound } from "@ricons/material";

export default function Page() {
	return (
		<Flex gap={12} direction='column'>
			<Popup
				content={
					<div className='pd-8'>
						<>
							<List.Item type='option'>
								<span>复制</span>
								<Tag size='small' className='bg-blue-0'>
									<Icon
										icon={<KeyboardCommandKeyRound />}
										size='1.125em'
									/>
									<span>C</span>
								</Tag>
							</List.Item>
							<List.Item type='option'>
								<span>粘贴</span>
								<Tag size='small' className='bg-blue-0'>
									<Icon
										icon={<KeyboardCommandKeyRound />}
										size='1.125em'
									/>
									<span>V</span>
								</Tag>
							</List.Item>
						</>
					</div>
				}
				trigger='contextmenu'
			>
				<div
					style={{ width: 200, height: 200 }}
					className='bg-grey'
				></div>
			</Popup>

			<Popup
				content={<div style={{ width: 120, height: 120 }}></div>}
				className='bg-pink-0'
				position='bottom'
				touchable
			>
				<Button className='mx-auto'>Popup</Button>
			</Popup>
		</Flex>
	);
}
