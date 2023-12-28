import { Icon } from "@p";
import {
	AdsClickRound,
	ApiRound,
	AssignmentOutlined,
	BubbleChartTwotone,
	CalendarMonthTwotone,
	ChatBubbleOutlineRound,
	CheckBoxOutlined,
	ColorLensTwotone,
	Crop75Round,
	DashboardTwotone,
	DataUsageRound,
	FormatListNumberedRound,
	GridOnRound,
	ImageTwotone,
	KeyboardArrowDownRound,
	LabelTwotone,
	LineWeightRound,
	LocalGasStationTwotone,
	Looks5Round,
	MoveToInboxTwotone,
	NoiseControlOffRound,
	PaddingTwotone,
	PowerInputRound,
	PushPinTwotone,
	RadioButtonCheckedRound,
	SavingsTwotone,
	SoupKitchenTwotone,
	TextFormatRound,
	UnfoldMoreRound,
	ViewCarouselTwotone,
	ViewDayTwotone,
	ViewQuiltOutlined,
	ViewSidebarTwotone,
	WebAssetTwotone,
	WysiwygTwotone,
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
				icon: <Icon icon={<LocalGasStationTwotone />} />,
			},
		],
	},
	{
		title: "Components",
		icon: <Icon icon={<DashboardTwotone />} />,
		expanded: true,
		children: [
			{
				title: "Affix",
				href: "/docs/affix",
				as: Link,
				icon: <Icon icon={<PushPinTwotone />} />,
			},
			{
				title: "Badge",
				href: "/docs/badge",
				as: Link,
				icon: <Icon icon={<NoiseControlOffRound />} />,
			},
			{
				title: "Button",
				href: "/docs/button",
				as: Link,
				icon: <Icon icon={<Crop75Round />} />,
			},
			{
				title: "Card",
				href: "/docs/card",
				as: Link,
				icon: <Icon icon={<WysiwygTwotone />} />,
			},
			{
				title: "Collapse",
				href: "/docs/collapse",
				as: Link,
				icon: <Icon icon={<ViewDayTwotone />} />,
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
				title: "Drawer",
				href: "/docs/drawer",
				as: Link,
				icon: <Icon icon={<ViewSidebarTwotone />} />,
			},
			{
				title: "Dropdown",
				href: "/docs/dropdown",
				as: Link,
				icon: <Icon icon={<KeyboardArrowDownRound />} />,
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
						title: "DatePicker",
						href: "/docs/datepicker",
						as: Link,
						icon: <Icon icon={<CalendarMonthTwotone />} />,
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
						icon: (
							<Icon
								icon={<RadioButtonCheckedRound />}
								size='1.2em'
								style={{ marginInline: ".15em" }}
							/>
						),
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
				icon: <Icon icon={<SavingsTwotone />} />,
			},
			{
				title: "Image",
				href: "/docs/image",
				as: Link,
				icon: <Icon icon={<ImageTwotone />} />,
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
				title: "Progress",
				href: "/docs/progress",
				as: Link,
				icon: <Icon icon={<DataUsageRound />} />,
			},
			{
				title: "Swiper",
				href: "/docs/swiper",
				as: Link,
				icon: <Icon icon={<ViewCarouselTwotone />} />,
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
			{
				title: "Tag",
				href: "/docs/tag",
				as: Link,
				icon: <Icon icon={<LabelTwotone />} />,
			},
			{
				title: "Text",
				href: "/docs/text",
				as: Link,
				icon: <Icon icon={<TextFormatRound />} />,
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
