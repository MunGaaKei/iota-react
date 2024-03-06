import { Step } from "@p";
import { useState } from "react";

export default function Page() {
	const [active, setActive] = useState(0);

	return (
		<>
			<Step vertical active={active} onClick={setActive}>
				<Step.Item title={<h4>提交</h4>}>
					<p className='color-5'>已提交成功 ✌️</p>
				</Step.Item>
				<Step.Item title={<h4>审核中</h4>}>
					<p className='color-5'>还在审核中 😊</p>
				</Step.Item>
				<Step.Item title={<h4>通过</h4>}>
					<p className='color-5'>通过啦 👌</p>
				</Step.Item>
			</Step>

			<Step active={active} onClick={setActive} className='mt-40'>
				<Step.Item title={<h4>提交</h4>}>
					<p className='color-5'>已提交成功 ✌️</p>
				</Step.Item>
				<Step.Item title={<h4>审核中</h4>}>
					<p className='color-5'>还在审核中 😊</p>
				</Step.Item>
				<Step.Item title={<h4>通过</h4>}>
					<p className='color-5'>通过啦 👌</p>
				</Step.Item>
			</Step>
		</>
	);
}
