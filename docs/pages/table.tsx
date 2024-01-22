import { Button, Table, Tag } from "@p";
import { IColumn } from "@p/components/table/type";
import { mock } from "mockjs";

const columns = [
	{
		id: "id",
		fixed: "left",
		width: 40,
	},
	{
		id: "name",
		fixed: "left",
	},
	{
		id: "email",
	},
	{
		id: "phone",
	},
	{
		id: "gender",
		title: "性别",
		align: "center",
		sorter: true,
		render: (value: number) => {
			return value > 0 ? "男" : "女";
		},
	},
	{
		id: "birth",
		width: 160,
	},
	{
		id: "address",
		width: 200,
	},
	{
		id: "active",
		fixed: "right",
		align: "center",
		render: (value: boolean) => {
			return value ? (
				<Tag className='bg-green-0'>是</Tag>
			) : (
				<Tag className='bg-red-0'>否</Tag>
			);
		},
	},
	{
		id: "none",
		renderHeader: (column) => {
			return "自定义渲染头部";
		},
	},
	{
		id: "action",
		fixed: "right",
		align: "center",
		render: () => (
			<Button className='bg-black-0' size='small'>
				操作
			</Button>
		),
	},
] as IColumn[];

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
				active: "@boolean",
			},
		],
	});

	return (
		<>
			<Table
				data={list}
				columns={columns}
				style={{ height: 400 }}
				// resizable
			/>
		</>
	);
}
