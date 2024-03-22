import { Button, Datagrid, Flex, Tag } from "@p";
import { IColumn } from "@p/components/datagrid/type";
import { mock } from "mockjs";
import { useState } from "react";

const columns = [
	{
		id: "id",
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
		title: "手机",
	},
	{
		id: "gender",
		title: "性别",
		justify: "center",
		sorter: true,
		render: (value: number) => {
			return value > 0 ? "男" : "女";
		},
	},
	{
		id: "birth",
		title: "生日",
		sorter: (a, b) =>
			new Date(b.birth).getTime() - new Date(a.birth).getTime(),
	},
	{
		id: "address",
		title: "地址",
	},
	{
		id: "active",
		justify: "center",
		render: (value: boolean) => {
			return value ? (
				<Tag className='bg-green'>是</Tag>
			) : (
				<Tag className='bg-error'>否</Tag>
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
		justify: "center",
		render: () => (
			<Button className='bg-grey' size='small'>
				操作
			</Button>
		),
	},
] as IColumn[];

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

export default function Page() {
	const [loading, setLoading] = useState(false);

	return (
		<>
			<Datagrid
				data={list}
				columns={columns}
				style={{ height: 400 }}
				loading={loading}
				resizable
			/>

			<Flex className='mt-20' gap={8}>
				<Button onClick={() => setLoading(!loading)}>加载</Button>
			</Flex>
		</>
	);
}
