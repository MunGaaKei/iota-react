import { Icon } from "@p";
import {
	AdsClickRound,
	ApiRound,
	AssignmentOutlined,
	BubbleChartTwotone,
	ChatBubbleOutlineRound,
	CheckBoxOutlined,
	ColorLensTwotone,
	Crop75Round,
	DashboardTwotone,
	EmojiNatureTwotone,
	FormatListNumberedRound,
	GridOnRound,
	LineWeightRound,
	Looks5Round,
	MoveToInboxTwotone,
	PaddingTwotone,
	PowerInputRound,
	RadioButtonCheckedRound,
	SoupKitchenTwotone,
	StyleTwotone,
	TableRowsOutlined,
	UnfoldMoreRound,
	ViewQuiltOutlined,
	WebAssetTwotone,
} from "@ricons/material";
import { Link } from "react-router-dom";

export default [
	{
		title: "Install",
		as: Link,
		icon: <Icon icon={<MoveToInboxTwotone />} />,
	},
	{
		title: "Style & Colors",
		as: Link,
		icon: <Icon icon={<SoupKitchenTwotone />} />,
		children: [
			{
				title: "Colors",
				href: "/docs/colors",
				as: Link,
				icon: <Icon icon={<ColorLensTwotone />} />,
			},
			{
				title: "Helper Class",
				href: "/docs/helper",
				as: Link,
				icon: <Icon icon={<StyleTwotone />} />,
			},
		],
	},
	{
		title: "Components",
		icon: <Icon icon={<DashboardTwotone />} />,
		expanded: true,
		children: [
			{
				title: "Button",
				href: "/docs/button",
				as: Link,
				icon: <Icon icon={<Crop75Round />} />,
			},
			{
				title: "Container",
				href: "/docs/container",
				as: Link,
				icon: <Icon icon={<ViewQuiltOutlined />} />,
			},
			{
				title: "Dialog",
				href: "/docs/dialog",
				icon: <Icon icon={<WebAssetTwotone />} />,
				as: Link,
			},
			{
				title: "Dropdown",
				href: "/docs/dropdown",
				as: Link,
				icon: <Icon icon={<TableRowsOutlined />} />,
			},
			{
				title: "Form",
				href: "/docs/form",
				as: Link,
				icon: <Icon icon={<AssignmentOutlined />} />,
				children: [
					{
						title: "Checkbox",
						href: "/docs/checkbox",
						as: Link,
						icon: <Icon icon={<CheckBoxOutlined />} />,
					},
					{
						title: "Input",
						href: "/docs/input",
						as: Link,
						icon: <Icon icon={<PowerInputRound />} />,
					},
					{
						title: "Radio",
						href: "/docs/radio",
						as: Link,
						icon: <Icon icon={<RadioButtonCheckedRound />} />,
					},
					{
						title: "Select",
						href: "/docs/select",
						as: Link,
						icon: <Icon icon={<UnfoldMoreRound />} />,
					},
				],
			},
			{
				title: "Icon",
				href: "/docs/icon",
				as: Link,
				icon: <Icon icon={<EmojiNatureTwotone />} />,
			},
			{
				title: "List",
				href: "/docs/list",
				as: Link,
				icon: <Icon icon={<FormatListNumberedRound />} />,
			},
			{
				title: "Message",
				href: "/docs/message",
				as: Link,
				icon: <Icon icon={<LineWeightRound />} />,
			},
			{
				title: "Pagination",
				href: "/docs/pagination",
				as: Link,
				icon: <Icon icon={<Looks5Round />} />,
			},
			{
				title: "Popup",
				href: "/docs/popup",
				as: Link,
				icon: <Icon icon={<ChatBubbleOutlineRound />} />,
			},
			{
				title: "Tabs",
				href: "/docs/tabs",
				as: Link,
				icon: <Icon icon={<PaddingTwotone />} />,
			},
			{
				title: "Table",
				href: "/docs/table",
				as: Link,
				icon: <Icon icon={<GridOnRound />} />,
			},
		],
	},
	{
		title: "Directives",
		icon: <Icon icon={<ApiRound />} />,
		children: [
			{
				title: "Clickoutside",
				href: "/docs/clickoutside",
				as: Link,
				icon: <Icon icon={<AdsClickRound />} />,
			},
			{
				title: "Ripple",
				href: "/docs/ripple",
				as: Link,
				icon: <Icon icon={<BubbleChartTwotone />} />,
			},
		],
	},
];
