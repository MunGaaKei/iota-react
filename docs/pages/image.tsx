import { Button, Flex, Image } from "@p";
import { useState } from "react";

export default function Page() {
	const [src, setSrc] = useState("https://via.placeholder.com/150");
	const [i, setI] = useState(1);

	return (
		<>
			<Flex gap={12}>
				<Image src={src} lazyload />
				<Image src='https://via.placeholder.com/200'>
					<h3>你好</h3>
				</Image>
				<Image size={40} className='bg-yellow' round>
					😊
				</Image>
				<Image src='404'></Image>
			</Flex>
			<Flex gap={12} className='mt-12'>
				<Image.List />
				<Button
					onClick={() => {
						setI((n) => n + 1);
						setSrc("https://via.placeholder.com/" + i * 20);
					}}
				>
					修改src
				</Button>
			</Flex>
		</>
	);
}
