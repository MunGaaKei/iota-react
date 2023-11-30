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
				filter
				style={{ width: 400 }}
			/>
		</>
	);
}
