import { Button, Tag } from "@p";

export default function Page() {
	return (
		<div className='flex gap-12 items-center'>
			<Tag>tag</Tag>
			<Tag className='bg-blue'>tag</Tag>
			<Tag className='bg-red'>tag</Tag>
			<Tag className='bg-pink'>tag</Tag>
			<Tag className='bg-green'>tag</Tag>
			<Tag className='bg-yellow'>tag</Tag>
			<Tag className='bg-black'>tag</Tag>
			<Tag className='bg-green-0'>tag</Tag>
			<Button>button</Button>
			<Button className='bg-blue'>button</Button>
			<Button className='bg-red'>button</Button>
			<Button className='bg-pink'>button</Button>
			<Button className='bg-green'>button</Button>
			<Button className='bg-yellow'>button</Button>
			<Button className='bg-black'>button</Button>
			<Button className='bg-green-0'>button</Button>
		</div>
	);
}
