import { Table } from "@p";
import { mock } from "mockjs";

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

	return <Table data={list}></Table>;
}
