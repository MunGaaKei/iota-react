import { Description } from "@p";
import { mock } from "mockjs";

export default function Page() {
	const { list } = mock({
		"list|50": [
			{
				label: "@cname",
				value: "@county(true)",
			},
		],
	});

	Object.assign(list[1], {
		colSpan: 2,
		rowSpan: 2,
	});

	return (
		<>
			<Description data={list} />
		</>
	);
}
