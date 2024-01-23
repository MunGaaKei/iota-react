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
								title: "A-0",
							},
							{
								title: "A-1",
								expanded: true,
								children: [
									{
										title: "A-1-0",
									},
									{
										title: "A-1-1",
									},
									{
										title: "A-1-2",
									},
								],
							},
						],
						expanded: true,
					},
					{
						title: "B",
						children: [
							{
								title: "B-0",
								children: [
									{
										title: "B-0-0",
									},
									{
										title: "B-0-1",
									},
								],
							},
							{
								title: "B-1",
							},
							{
								title: "B-2",
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
