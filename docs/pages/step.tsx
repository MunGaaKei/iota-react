import { Step } from "@p";

export default function Page() {
	return (
		<>
			<Step>
				<Step.Item>
					<h4>提交</h4>
					<p className='color-5'>填写表单</p>
				</Step.Item>
				<p>123</p>
				<Step.Item className='rensadfsd'>
					<h4>审核中</h4>
					<p className='color-5'>待主管审核</p>
				</Step.Item>
				<Step.Item>
					<h4>通过</h4>
					<p className='color-5'>已完成</p>
				</Step.Item>
			</Step>
		</>
	);
}