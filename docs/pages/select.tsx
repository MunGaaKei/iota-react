import { Select } from "@p";

export default function Page() {
	return (
		<>
			<Select
				multiple
				placeholder='placeholder'
				options={Array.from({ length: 50 }).map(
					(n, i) => `option ${i}`
				)}
				style={{ width: 300 }}
			/>

			<br />

			<Select
				placeholder='placeholder'
				options={Array.from({ length: 50 }).map(
					(n, i) => `option ${i}`
				)}
				className='mt-20'
				style={{ width: 300 }}
			/>
		</>
	);
}
