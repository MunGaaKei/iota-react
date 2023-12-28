import { Image } from "@p";

export default function Page() {
	return (
		<>
			<Image
				src='https://via.placeholder.com/150'
				onError={() => {
					console.log(123);
				}}
			/>
		</>
	);
}
