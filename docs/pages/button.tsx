import { Button } from "@p";

export default function button(): JSX.Element {
	return (
		<div className='flex flex-column gap-12'>
			<Button size='small'>SMALL</Button>
			<Button>普通</Button>
			<Button size='large'>LARGE</Button>
			<Button size='extreme'>巨大</Button>
			<Button outline>边框</Button>
			<Button flat>文字</Button>
			<Button flat className='blue'>
				文字
			</Button>
			<Button disabled>禁用</Button>
		</div>
	);
}
