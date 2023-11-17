import { Button, Input, Popup } from "@p";

export default function Page() {
	return (
		<>
			<Popup content={<div className='pd-12'>popup</div>} trigger='click'>
				<Button>CLICK</Button>
			</Popup>
			<Popup content={<div className='pd-12'>popup</div>}>
				<Button>HOVER</Button>
			</Popup>
			<Popup content={<div className='pd-12'>popup</div>} trigger='focus'>
				<Input />
			</Popup>
		</>
	);
}
