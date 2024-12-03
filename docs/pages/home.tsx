import { Button, Flex, Image, Text } from "@p";
import { Link } from "react-router-dom";
import { version } from "../../package.json";
import "./css/home.css";
import logo from "/logo.png";

export default function Home() {
	return (
		<Flex className='h-100vh justify-evenly'>
			<div className='self-center'>
				<Image src={logo} size={100} />
			</div>
			<Flex direction='column' justify='center' align='flex-start'>
				<h1 className='home-title'>
					<Text
						gradient={[
							"30deg",
							"var(--color-1)",
							"var(--color-2)",
							"var(--color-6)",
						]}
					>
						IOTA
					</Text>{" "}
					<Text
						gradient={[
							"30deg",
							"var(--color-1)",
							"var(--color-2)",
							"var(--color-6)",
						]}
					>
						REACT
					</Text>
				</h1>
				<p className='my-12'>{version}</p>
				<Button
					as={Link}
					href='/docs/install'
					className='hover-shadow bg-blue'
				>
					开始
				</Button>
			</Flex>
		</Flex>
	);
}
