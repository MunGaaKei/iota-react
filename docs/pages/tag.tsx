import { Tag } from "@p";

export default function Page() {
	return (
		<>
			<Tag>tag</Tag>
			<div className='flex flex-wrap gap-12 mt-12 items-center'>
				<Tag className='bg-blue'>tag</Tag>
				<Tag className='bg-red'>tag</Tag>
				<Tag className='bg-pink'>tag</Tag>
				<Tag className='bg-green' hideDot>
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
				<Tag className='bg-green-0' hideDot>
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
