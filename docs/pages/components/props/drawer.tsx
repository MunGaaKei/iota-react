import { Button, Drawer } from "@p";
import { useState } from "react";

export const DBasic = {
	demo: () => {
		const [visible, setVisible] = useState(false);

		return (
			<>
				<Button onClick={() => setVisible(true)}>打开</Button>
				<Drawer visible={visible} onVisibleChange={setVisible}>
					<div className='pd-12'>
						<Button>11</Button>
					</div>
				</Drawer>
			</>
		);
	},
	code: ``,
	lang: "javascript",
};

export const PDrawer = [
	{
		name: "items",
		desc: "子项，也可以通过 Collapse.Item 传入。items 优先级更高",
		type: [
			<a className='blue' href='/docs/collapse#collapse-item'>
				ICollapseItem[]
			</a>,
		],
	},
	{
		name: "active",
		desc: "激活项，multiple 值是 true 的时候可为数组",
		type: ["string", "number", "(string | number)[]"],
	},
	{
		name: "multiple",
		desc: "是否可以同时展开多个",
		type: ["boolean"],
		def: "false",
	},
	{
		name: "border",
		desc: "边框",
		type: ["boolean"],
		def: "false",
	},
	{
		name: "headerClickable",
		desc: "点击 header 也可以展开",
		type: ["boolean"],
		def: "false",
	},
	{
		name: "renderToggle",
		desc: "渲染展开按钮图标",
		type: ["(active?: boolean) => ReactNode"],
	},
	{
		name: "onCollapse",
		desc: "卡片边框",
		type: ["(key: string | number, active: boolean) => void"],
		event: true,
	},
];
