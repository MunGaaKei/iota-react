import { Icon } from "@p";
import {
	AccountTreeTwotone,
	AnnouncementTwotone,
	ArrowDropDownCircleTwotone,
	ArtTrackSharp,
	AssignmentOutlined,
	BubbleChartTwotone,
	BuildCircleTwotone,
	CalendarMonthTwotone,
	ChatBubbleOutlineRound,
	CheckBoxOutlined,
	CloudUploadTwotone,
	ColorLensTwotone,
	Crop75Round,
	CrueltyFreeRound,
	DashboardTwotone,
	DataUsageRound,
	FormatListNumberedRound,
	FunctionsRound,
	GridOnRound,
	ImageTwotone,
	LabelTwotone,
	LineWeightRound,
	LinearScaleRound,
	LooksOneOutlined,
	MoveToInboxTwotone,
	NoiseControlOffRound,
	PaddingTwotone,
	PlayCircleOutlineRound,
	PowerInputRound,
	PushPinTwotone,
	RadioButtonCheckedRound,
	RemoveRedEyeRound,
	StyleTwotone,
	TextFormatRound,
	UnfoldMoreRound,
	ViewCarouselTwotone,
	ViewDayTwotone,
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
		href: "/docs/install",
	},
	{
		title: "Style & Colors",
		as: Link,
		icon: <Icon icon={<StyleTwotone />} />,
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
				icon: <Icon icon={<BuildCircleTwotone />} />,
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
			// {
			// 	title: "Area",
			// 	href: "/docs/area",
			// 	as: Link,
			// 	icon: <Icon icon={<ViewQuiltOutlined />} />,
			// },
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
				title: "Datagrid",
				href: "/docs/datagrid",
				as: Link,
				icon: <Icon icon={<GridOnRound />} />,
			},
			{
				title: "Description",
				href: "/docs/description",
				as: Link,
				icon: <Icon icon={<ArtTrackSharp />} />,
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
				icon: (
					<Icon
						icon={<ArrowDropDownCircleTwotone />}
						size='1.2em'
						style={{ marginInline: ".15em" }}
					/>
				),
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
						title: "Progress",
						href: "/docs/progress",
						as: Link,
						icon: <Icon icon={<DataUsageRound />} />,
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
					{
						title: "Upload",
						href: "/docs/upload",
						as: Link,
						icon: <Icon icon={<CloudUploadTwotone />} />,
					},
				],
			},
			{
				title: "Icon",
				href: "/docs/icon",
				as: Link,
				icon: <Icon icon={<CrueltyFreeRound />} />,
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
				title: "Modal",
				href: "/docs/modal",
				icon: <Icon icon={<WebAssetTwotone />} />,
				as: Link,
			},
			{
				title: "Pagination",
				href: "/docs/pagination",
				as: Link,
				icon: <Icon icon={<LooksOneOutlined />} />,
			},
			{
				title: "Popconfirm",
				href: "/docs/popconfirm",
				as: Link,
				icon: <Icon icon={<AnnouncementTwotone />} />,
			},
			{
				title: "Popup",
				href: "/docs/popup",
				as: Link,
				icon: <Icon icon={<ChatBubbleOutlineRound />} />,
			},
			{
				title: "Preview",
				href: "/docs/preview",
				as: Link,
				icon: <Icon icon={<RemoveRedEyeRound />} />,
			},
			{
				title: "Step",
				href: "/docs/step",
				as: Link,
				icon: <Icon icon={<LinearScaleRound />} />,
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
			{
				title: "Tree",
				href: "/docs/tree",
				as: Link,
				icon: <Icon icon={<AccountTreeTwotone />} />,
			},
			{
				title: "Video",
				href: "/docs/video",
				as: Link,
				icon: <Icon icon={<PlayCircleOutlineRound />} />,
			},
		],
	},
	{
		title: "Hooks",
		icon: <Icon icon={<FunctionsRound />} />,
		children: [
			{
				title: "useRipple",
				href: "/docs/ripple",
				as: Link,
				icon: <Icon icon={<BubbleChartTwotone />} />,
			},
		],
	},
];
