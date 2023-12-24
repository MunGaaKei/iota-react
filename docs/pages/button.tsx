import { Button } from "@p";

export default function button(): JSX.Element {
	return (
		<div className='flex flex-column gap-12'>
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
		</div>
	);
}
