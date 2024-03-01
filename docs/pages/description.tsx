import { Description, Text } from "@p";
import { mock } from "mockjs";

export default function Page() {
	const { list } = mock({
		"list|10": [
			{
				label: "@cname",
				value: "@county(true)",
			},
		],
	});

	const stat = [
		{
			label: <span className='color-5'>未完成</span>,
			value: <Text.Number to={5415} count={0} thousand=',' size={32} />,
		},
		{
			label: <span className='color-5'>进行中</span>,
			value: (
				<Text.Number
					to={52}
					count={0}
					thousand=','
					size={32}
					className='blue'
				/>
			),
		},
		{
			label: <span className='color-5'>已完成</span>,
			value: (
				<Text.Number
					to={233}
					count={0}
					thousand=','
					size={32}
					className='green'
				/>
			),
		},
	];

	return (
		<>
			<Description data={list} />
			<Description
				data={stat}
				columns={3}
				vertical
				equally
				align='center'
				className='mt-40'
			/>
		</>
	);
}
