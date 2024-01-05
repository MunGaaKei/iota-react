import { Button, Flex, Tag } from "@p";

export default function Page() {
	return (
		<>
			<Flex gap={12}>
				<Button>
					<span>tag</span>
					<Tag dot dotClass='bg-red'>
						tag
					</Tag>
				</Button>
				<Tag dot dotClass='bg-red'>
					tag
				</Tag>
			</Flex>
			<div className='flex flex-wrap gap-12 mt-12 items-center'>
				<Tag className='bg-blue'>tag</Tag>
				<Tag className='bg-red'>tag</Tag>
				<Tag className='bg-pink'>tag</Tag>
				<Tag className='bg-green' dot>
					tag
				</Tag>
				<Tag className='bg-yellow'>tag</Tag>
				<Tag className='bg-purple' onClose={() => null}>
					tag
				</Tag>
				<Tag className='brown' outline onClick={() => null}>
					tag
				</Tag>
				<Tag className='bg-aqua' onClick={() => null}>
					tag
				</Tag>
				<Tag className='orange'>tag</Tag>
				<Tag className='bg-black'>tag</Tag>
			</div>
			<div className='flex gap-12 mt-12 items-center flex-wrap'>
				<Tag className='bg-blue-0'>tag</Tag>
				<Tag className='bg-red-0' dotClass='red'>
					tag
				</Tag>
				<Tag className='bg-pink-0'>tag</Tag>
				<Tag className='bg-green-0' dot>
					tag
				</Tag>
				<Tag className='bg-yellow-0'>tag</Tag>
				<Tag className='bg-purple-0' onClick={() => null}>
					tag
				</Tag>
				<Tag className='bg-brown-0'>tag</Tag>
				<Tag className='bg-aqua-0'>tag</Tag>
				<Tag className='bg-orange-0'>tag</Tag>
				<Tag className='bg-black-0'>tag</Tag>
			</div>
		</>
	);
}
