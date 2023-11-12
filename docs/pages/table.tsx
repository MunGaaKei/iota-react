import { Table } from "@p";
import { mock } from "mockjs";

const columns = [
	{
		field: "id",
		fixed: "left",
		width: "45px",
	},
	{
		field: "name",
	},
	{
		field: "email",
	},
	{
		field: "phone",
	},
	{
		field: "gender",
		title: "性别",
		render: (value: number) => {
			return value > 0 ? "男" : "女";
		},
	},
	{
		field: "birth",
	},
	{
		field: "address",
	},
];

export default function Page() {
	const { list } = mock({
		"list|50": [
			{
				"id|+1": 1,
				name: "@cname",
				email: "@email",
				phone: /^1[385][1-9]\d{8}/,
				"gender|0-1": 0,
				birth: "@date",
				// "tags|0-2": ["@ctitle(2)"],
				address: "@county(true)",
				// active: "@boolean",
			},
		],
	});

	return (
		<Table data={list} columns={columns} style={{ height: 500 }}></Table>
	);
}
