import { Flex, Image } from "@p";

export default function Page() {
	return (
		<Flex gap={12}>
			<Image src='https://via.placeholder.com/150' />
			<Image size={40} className='bg-yellow' round>
				😊
			</Image>
		</Flex>
	);
}
