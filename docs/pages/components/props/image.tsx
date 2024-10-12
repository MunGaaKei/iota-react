import { Image } from "@p";

export const DBasic = {
	demo: <Image src='https://via.placeholder.com/60' size={60} />,
	code: `<Icon icon={<DownhillSkiingRound />} size='5em' rotate={-45} />`,
	lang: "xml",
};

export const DImageList = {
	demo: (
		<Image.List
			items={[
				"https://via.placeholder.com/60",
				"https://via.placeholder.com/60/aaa",
			]}
		/>
	),
	code: `<Icon icon={<DownhillSkiingRound />} size='5em' rotate={-45} />`,
	lang: "xml",
};

export const PImage = [
	{
		name: "src",
		desc: "图片地址",
		type: ["string"],
	},
	{
		name: "round",
		desc: "圆形",
		type: ["boolean"],
		def: "false",
	},
	{
		name: "size",
		desc: "图片大小",
		type: ["number", "string"],
	},
	{
		name: "initSize",
		desc: "图片初始大小，图片未加载完时显示大小",
		type: ["number", "string"],
	},
	{
		name: "lazyload",
		desc: "图片懒加载",
		type: ["boolean"],
		def: "false",
	},
	{
		name: "fallback",
		desc: "图片加载失败时显示",
		type: ["ReactNode"],
		def: "<Icon icon={<HideImageTwotone />} size='2em' className='color-5' />",
	},
	{
		name: "fit",
		desc: "图片CSS Object-fit",
		type: ["string"],
	},
];
