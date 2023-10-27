import { Icon } from "@p";
import { ApiRound, ColorLensTwotone, DashboardTwotone } from "@ricons/material";
import { Link } from "react-router-dom";

export default [
	{
		title: "USAGE",
		type: "title",
	},
	{
		title: "Style & Colors",
		icon: <Icon icon={ColorLensTwotone} />,
		children: [
			{
				title: "Colors",
				href: "/docs/colors",
			},
			{
				title: "Helper Class",
				href: "/docs/helper",
			},
		],
	},
	{
		title: "Components",
		icon: <Icon icon={DashboardTwotone} />,
		expanded: true,
		children: [
			{
				title: "Button",
				href: "/docs/button",
				as: Link,
			},
			{
				title: "Container",
				href: "/docs/container",
			},
			{
				title: "Dialog",
				href: "/docs/dialog",
				disabled: true,
			},
			{
				title: "Dropdown",
				href: "/docs/dropdown",
			},
			{
				title: "Form",
				href: "/docs/form",
				as: Link,
				children: [
					{
						title: "Checkbox",
						href: "/docs/checkbox",
					},
					{
						title: "Input",
						href: "/docs/input",
					},
					{
						title: "Radio",
						href: "/docs/radio",
					},
					{
						title: "Select",
						href: "/docs/select",
					},
				],
			},
			{
				title: "Icon",
				href: "/docs/icon",
			},
			{
				title: "List",
				href: "/docs/list",
			},
			{
				title: "Message",
				href: "/docs/message",
			},
			{
				title: "Page",
				href: "/docs/page",
			},
			{
				title: "Popup",
				href: "/docs/popup",
			},
			{
				title: "Tab",
				href: "/docs/tab",
			},
			{
				title: "Table",
				href: "/docs/table",
			},
		],
	},
	{
		title: "Directives",
		icon: <Icon icon={ApiRound} />,
		children: [
			{
				title: "Clickoutside",
				href: "/docs/clickoutside",
			},
			{
				title: "Ripple",
				href: "/docs/ripple",
			},
		],
	},
];
