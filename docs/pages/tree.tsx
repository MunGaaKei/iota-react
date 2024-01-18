import { Tree } from "@p";

export default function Page() {
	return (
		<>
			<Tree
				items={[
					{
						title: "A",
						children: [
							{
								title: "A-1",
							},
							{
								title: "A-2",
							},
						],
						expanded: true,
					},
					{
						title: "B",
						children: [
							{
								title: "B-1",
							},
							{
								title: "B-2",
							},
							{
								title: "B-3",
							},
						],
						expanded: true,
					},
				]}
				checkable
			/>
		</>
	);
}
