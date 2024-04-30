import { Button, Flex, Icon } from "@p";
import {
	AllInclusiveRound,
	LightModeTwotone,
	NightlightTwotone,
} from "@ricons/material";

export const DBasic = {
	demo: (
		<Flex gap={12}>
			<Button>Button</Button>
			<Button secondary>Secondary</Button>
			<Button outline>Outline</Button>
			<Button round>Round</Button>
			<Button flat>Flat</Button>
			<Button square>
				<Icon icon={<AllInclusiveRound />} />
			</Button>
			<Button loading>Loading</Button>
			<Button disabled>Disabled</Button>
		</Flex>
	),
	code: `<Button>Button</Button>
<Button secondary>Secondary</Button>
<Button outline>Outline</Button>
<Button round>Round</Button>
<Button flat>Flat</Button>
<Button square>
    <Icon icon={<AllInclusiveRound />} />
</Button>
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>`,
	lang: "xml",
};

export const DColor = {
	demo: (
		<Flex gap={12}>
			<Button className='bg-blue'>Blue</Button>
			<Button className='pink' outline>
				Outline Pink
			</Button>
			<Button className='brown' flat>
				Flat Brown
			</Button>
			<Button className='red bg-yellow'>Mixed Red Yellow</Button>
		</Flex>
	),
	code: `<Button className='bg-blue'>Blue</Button>
<Button className='pink' outline>
    Outline Pink
</Button>
<Button className='brown' flat>
    Flat Brown
</Button>
<Button className='red bg-yellow'>Mixed Red Yellow</Button>`,
	lang: "xml",
};

export const DToggle = {
	demo: (
		<Flex gap={12} direction='column' align='flex-start'>
			<Button.Toggle
				secondary
				after={<Icon icon={<NightlightTwotone />} />}
			>
				<Icon icon={<LightModeTwotone />} />
			</Button.Toggle>
			<Button.Toggle
				after='Active'
				activeClass='bg-blue'
				onToggle={(v) => {
					console.log(v);
				}}
			>
				Deactive
			</Button.Toggle>
		</Flex>
	),
	code: `<Button.Toggle
	secondary
	after={<Icon icon={<NightlightTwotone />} />}
>
	<Icon icon={<LightModeTwotone />} />
</Button.Toggle>
<Button.Toggle after='Active' activeClass='bg-blue'>
	Deactive
</Button.Toggle>`,
	lang: "xml",
};

export const PButton = [
	{
		name: "as",
		def: "'a'",
		desc: "标签名",
		type: [
			"string",
			<a
				className='blue'
				href='https://reactrouter.com/en/main/components/link#link'
				target='_blank'
			>
				Link
			</a>,
		],
	},
	{
		name: "secondary",
		desc: "次级按钮",
		type: ["boolean"],
		def: "false",
	},
	{
		name: "flat",
		desc: "无背景色按钮",
		type: ["boolean"],
		def: "false",
	},
	{
		name: "outline",
		desc: "边框类型按钮",
		type: ["boolean"],
		def: "false",
	},
	{
		name: "round",
		desc: "圆角",
		type: ["boolean"],
		def: "false",
	},
	{
		name: "block",
		desc: "块级按钮",
		type: ["boolean"],
		def: "false",
	},
	{
		name: "loading",
		desc: "加载状态",
		type: ["boolean"],
		def: "false",
	},
	{
		name: "disabled",
		desc: "禁用状态",
		type: ["boolean"],
		def: "false",
	},
	{
		name: "size",
		desc: "按钮尺寸",
		type: ["small", "normal", "large", "extreme"],
		def: "'normal'",
	},
	{
		name: "square",
		desc: "等宽高按钮",
		type: ["boolean"],
		def: "false",
	},
	{
		name: "ripple",
		desc: "按钮点击触发波纹效果",
		type: ["boolean"],
		def: "true",
	},
];

export const PButtonToggle = [
	{
		name: "active",
		desc: "激活状态",
		type: ["boolean"],
		def: "false",
	},
	{
		name: "activeClass",
		desc: "激活时添加的className",
		type: ["string"],
	},
	{
		name: "after",
		desc: "激活状态时显示的内容",
		type: ["ReactNode"],
	},
	{
		name: "disabled",
		desc: "禁用状态",
		type: ["boolean"],
		def: "false",
	},
	{
		name: "onToggle",
		desc: "状态切换时触发",
		type: ["(active: boolean) => void"],
		event: true,
	},
];
