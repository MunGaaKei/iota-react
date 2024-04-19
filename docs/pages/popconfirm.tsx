import { Button, Flex, Icon, Input, Popconfirm } from "@p";
import { WarningRound } from "@ricons/material";
import { useState } from "react";

export default function Page() {
	const [value, setValue] = useState("");
	return (
		<Flex gap={12} direction='column' align='start'>
			<Popconfirm
				content={
					<Flex gap={12}>
						<Icon
							icon={<WarningRound />}
							className='error'
							size='2em'
						/>
						<div>
							<h5>警告</h5>
							<p className='my-8 color-5'>描述</p>
							<Input
								value={value}
								onChange={setValue}
								autoFocus
							/>
						</div>
					</Flex>
				}
				onOk={async () => {
					return new Promise((res, rej) => {
						setTimeout(() => {
							console.log(value);

							res();
						}, 2000);
					});
				}}
				okProps={{ className: "bg-error" }}
			>
				<Button>Popconfirm</Button>
			</Popconfirm>

			<Button className='bg-blue mt-40'>撒打发士大夫</Button>
		</Flex>
	);
}
