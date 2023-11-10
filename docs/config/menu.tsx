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
		icon: <Icon icon={<MoveToInboxTwotone />} />,
	},
	{
		title: "Style & Colors",
		icon: <Icon icon={<SoupKitchenTwotone />} />,
		children: [
			{
				title: "Colors",
				href: "/docs/colors",
				icon: <Icon icon={<ColorLensTwotone />} />,
			},
			{
				title: "Helper Class",
				href: "/docs/helper",
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
						icon: <Icon icon={<CheckBoxOutlined />} />,
					},
					{
						title: "Input",
						href: "/docs/input",
						icon: <Icon icon={<PowerInputRound />} />,
					},
					{
						title: "Radio",
						href: "/docs/radio",
						icon: <Icon icon={<RadioButtonCheckedRound />} />,
					},
					{
						title: "Select",
						href: "/docs/select",
						icon: <Icon icon={<UnfoldMoreRound />} />,
					},
				],
			},
			{
				title: "Icon",
				href: "/docs/icon",
				icon: <Icon icon={<EmojiNatureTwotone />} />,
			},
			{
				title: "List",
				href: "/docs/list",
				icon: <Icon icon={<FormatListNumberedRound />} />,
			},
			{
				title: "Message",
				href: "/docs/message",
				icon: <Icon icon={<LineWeightRound />} />,
			},
			{
				title: "Pagination",
				href: "/docs/pagination",
				icon: <Icon icon={<Looks5Round />} />,
			},
			{
				title: "Popup",
				href: "/docs/popup",
				icon: <Icon icon={<ChatBubbleOutlineRound />} />,
			},
			{
				title: "Tabs",
				href: "/docs/tabs",
				icon: <Icon icon={<PaddingTwotone />} />,
			},
			{
				title: "Table",
				href: "/docs/table",
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
				icon: <Icon icon={<AdsClickRound />} />,
			},
			{
				title: "Ripple",
				href: "/docs/ripple",
				icon: <Icon icon={<BubbleChartTwotone />} />,
			},
		],
	},
];
