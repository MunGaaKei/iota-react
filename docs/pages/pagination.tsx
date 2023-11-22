import { Pagination } from "@p";

export default function Page() {
	const handleChange = async (p: number) => {
		return new Promise((res, rej) => {
			setTimeout(() => {
				res(true);
			}, 1000);
		});
	};

	return (
		<>
			<Pagination page={1} total={81} onChange={handleChange} />
		</>
	);
}
