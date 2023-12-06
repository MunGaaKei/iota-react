import {
	Button,
	Form,
	Icon,
	Input,
	Message,
	Radio,
	Select,
	Textarea,
} from "@p";
import Checkbox from "@p/components/checkbox";
import { AccountCircleTwotone } from "@ricons/material";
import { useMemoizedFn } from "ahooks";
import { createRef } from "react";

const rules = {
	name: (value) => {
		if (!value) return "不能为空";
		return false;
	},
	password: (value) => {
		if (!value) return "不能为空";
		return false;
	},
	hobit: (value) => {
		if (!value || value.length < 2) return "请至少选2个";
		return false;
	},
	gender: (value) => {
		return value ? false : "请勾选";
	},
	country: (value) => {
		if (!value) return "不能为空";

		return false;
	},
	bio: (value) => {
		if (!value) return "不能为空";

		return false;
	},
};

export default function Page() {
	const form = Form.useForm();
	const ref = createRef<HTMLInputElement>();

	const handleSubmit = useMemoizedFn(() => {
		console.log(form.get());
	});

	const handleSetValues = useMemoizedFn(() => {
		form.set({ name: "sdfkjsdlfj", hobit: ["篮球"] });
	});

	const handleClear = useMemoizedFn(() => {
		console.log(ref.current);

		form.clear();
	});

	const handleValidate = useMemoizedFn(async () => {
		const data = await form.validate();
		// console.log(data);
		// const data = await form.validate("hobit");
		Message(data ? "校验成功" : "校验失败");
	});

	return (
		<>
			<Form form={form} rules={rules} width={400} className='gap-12'>
				<Input
					label='name'
					name='name'
					prepend={
						<Icon
							icon={<AccountCircleTwotone />}
							className='ml-8'
						/>
					}
					form={form.name}
				></Input>
				<Input
					ref={ref}
					type='password'
					label='密码'
					name='password'
					form={form.name}
					append={<Button className='bg-blue'>校验</Button>}
				></Input>
				<Select
					label='国家'
					name='country'
					options={[
						"中国",
						"新加坡",
						"俄罗斯",
						"日本",
						"泰国",
						{
							label: "美国",
							value: "美国",
							disabled: true,
						},
					]}
					placeholder='国家'
					multiple
					maxDisplay={2}
					form={form.name}
				/>
				<Checkbox
					label='兴趣'
					options={["足球", "篮球", "棒球"]}
					name='hobit'
					form={form.name}
					type='switch'
				/>
				<Radio
					label='性别'
					name='gender'
					options={["男", "女"]}
					form={form.name}
				/>
				<Textarea label='bio' name='bio' form={form.name}></Textarea>

				<div className='flex gap-12'>
					<Button onClick={handleSubmit}>获取表单值</Button>
					<Button onClick={handleValidate} className='bg-pink'>
						校验表单
					</Button>
					<Button onClick={handleSetValues} className='bg-blue'>
						填写表单
					</Button>
					<Button onClick={handleClear} className='bg-yellow'>
						清空
					</Button>
				</div>
			</Form>
		</>
	);
}
