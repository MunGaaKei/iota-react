import { List } from "@p";

export default function Page() {
	return (
		<>
			<List>
				{Array.from({ length: 10 }).map((n, i) => (
					<List.Item key={i}>item {i}</List.Item>
				))}
			</List>
		</>
	);
}
