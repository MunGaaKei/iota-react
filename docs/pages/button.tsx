import { Button, Flex } from "@p";

export default function button(): JSX.Element {
	return (
		<div className='flex flex-column gap-12 items-center'>
			<Button size='small'>小型</Button>
			<Button>正常</Button>
			<Button size='large'>大型</Button>
			<Button size='extreme'>巨大</Button>
			<Button size='extreme' square>
				巨大
			</Button>
			<Button outline>边框</Button>
			<Button flat>文字</Button>
			<Button flat className='aqua'>
				文字
			</Button>
			<Button className='bg-pink-0'>文字</Button>
			<Button disabled>禁用</Button>
			<Button loading>加载</Button>
			<Flex gap={12}>
				<Button className='bg-grey'>你好</Button>
				<Button className='bg-blue'>你好</Button>
				<Button className='bg-red'>你好</Button>
				<Button className='bg-yellow'>你好</Button>
				<Button className='bg-pink'>你好</Button>
				<Button className='bg-black'>你好</Button>
				<Button className='bg-white'>你好</Button>
			</Flex>
			<Flex>
				<Button.Toggle className='bg-aqua'>before</Button.Toggle>
			</Flex>
		</div>
	);
}
