import { ApiRound, ColorLensTwotone, DashboardTwotone } from "@ricons/material";

export default [
	{
		title: "USAGE",
		type: "subtitle",
	},
	{
		title: "Style & Colors",
		icon: <ColorLensTwotone />,
		children: [
			{
				title: "Colors",
				to: "/docs/colors",
			},
			{
				title: "Helper Class",
				to: "/docs/helper",
			},
		],
	},
	{
		title: "Components",
		icon: <DashboardTwotone />,
		expanded: true,
		children: [
			{
				title: "Button",
				to: "/docs/button",
			},
			{
				title: "Container",
				to: "/docs/container",
			},
			{
				title: "Dialog",
				to: "/docs/dialog",
			},
			{
				title: "Dropdown",
				to: "/docs/dropdown",
			},
			{
				title: "Form",
				to: "/docs/form",
				children: [
					{
						title: "Checkbox",
						to: "/docs/checkbox",
					},
					{
						title: "Input",
						to: "/docs/input",
					},
					{
						title: "Radio",
						to: "/docs/radio",
					},
					{
						title: "Select",
						to: "/docs/select",
					},
				],
			},
			{
				title: "Icon",
				to: "/docs/icon",
			},
			{
				title: "List",
				to: "/docs/list",
			},
			{
				title: "Message",
				to: "/docs/message",
			},
			{
				title: "Page",
				to: "/docs/page",
			},
			{
				title: "Popup",
				to: "/docs/popup",
			},
			{
				title: "Tab",
				to: "/docs/tab",
			},
			{
				title: "Table",
				to: "/docs/table",
			},
		],
	},
	{
		title: "Directives",
		icon: <ApiRound />,
		children: [
			{
				title: "Clickoutside",
				to: "/docs/clickoutside",
			},
			{
				title: "Ripple",
				to: "/docs/ripple",
			},
		],
	},
];
