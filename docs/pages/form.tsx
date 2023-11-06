import { Button, Form, Icon, Input, Radio, Select } from "@p";
import Checkbox from "@p/components/checkbox";
import { AccountCircleTwotone } from "@ricons/material";
import { useMemoizedFn } from "ahooks";

const rules = {
	name: (value: any) => {
		if (!value) return "不能为空";
		return false;
	},
	hobit: (value: any) => {
		if (!value || value.length < 2) return "请至少选2个";
		return false;
	},
	agree: (value: any) => {
		return value ? false : "请勾选";
	},
};

export default function Page() {
	const form = Form.useForm();

	const handleSubmit = useMemoizedFn(() => {
		console.log(form.get());
	});

	const handleSetValues = useMemoizedFn(() => {
		form.set({ name: "sdfkjsdlfj", hobit: ["篮球"] });
	});

	const handleClear = useMemoizedFn(() => {
		form.clear();
	});

	const handleValidate = useMemoizedFn(async () => {
		const data = await form.validate();
		console.log(data);
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
							className='my-auto ml-12'
						/>
					}
					form={form.name}
				></Input>
				<Select
					label='国家'
					options={[
						"中国",
						"新加坡",
						"俄罗斯",
						"日本",
						"泰国",
						"美国",
					]}
					clear
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
				<Input
					type='textarea'
					label='bio'
					name='bio'
					form={form.name}
				></Input>

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
