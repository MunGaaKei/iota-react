import { Button, Form, Input } from "@p";
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
		form.set({ name: "sdfkjsdlfj", agree: true });
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
				<Input label='name' name='name' form={form.name}></Input>
				<Input label='age' name='age' form={form.name} required></Input>

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
