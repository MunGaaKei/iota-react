import { Flex } from "@p";

export default function Page() {
	const colors = [
		"black",
		"white",
		"red",
		"blue",
		"green",
		"yellow",
		"pink",
		"purple",
		"orange",
		"aqua",
		"grey",
		"brown",
	];
	const statusColors = ["warning", "success", "error"];

	return (
		<>
			<h2 className='mb-40'>Colors</h2>
			<p>以下为基础颜色。</p>
			<Flex className='my-12' gap={4} wrap>
				{colors.map((c) => {
					return (
						<div key={c} className={`bg-${c} pd-12 round-0`}>
							{c}
						</div>
					);
				})}

				{statusColors.map((c) => {
					return (
						<div key={c} className={`bg-${c} pd-12 round-0`}>
							{c}
						</div>
					);
				})}
			</Flex>
			<h3 className='mt-80'>使用方法</h3>
			<p className='my-12'>每个颜色都有 5 种类名提供使用：</p>
			<Flex gap={4} columns={5} className='text-center'>
				<div className='blue pd-12 round-0'>.blue</div>
				<div className='bg-blue-0 pd-12 round-0'>.bg-blue-0</div>
				<div className='bg-blue pd-12 round-0'>.bg-blue</div>
				<div className='bg-blue-1 pd-12 round-0'>.bg-blue-1</div>
				<div className='bg-blue-2 pd-12 round-0'>.bg-blue-2</div>

				<div className='error pd-12 round-0'>.error</div>
				<div className='bg-error-0 pd-12 round-0'>.bg-error-0</div>
				<div className='bg-error pd-12 round-0'>.bg-error</div>
				<div className='bg-error-1 pd-12 round-0'>.bg-error-1</div>
				<div className='bg-error-2 pd-12 round-0'>.bg-error-2</div>
			</Flex>
		</>
	);
}
