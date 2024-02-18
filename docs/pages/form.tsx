import { Button, Flex, Form, Input, Message } from "@p";
import { useMemoizedFn } from "ahooks";
import { createRef, useState } from "react";

const { Field } = Form;

const rules = {
	name: (value) => {
		if (!value) return "不能为空";
		return false;
	},
	password: (value) => {
		if (!value) return "不能为空";
		return false;
	},
};

export default function Page() {
	const form = Form.useForm();
	const ref = createRef<HTMLInputElement>();
	const [val, setVal] = useState("");

	const handleSubmit = useMemoizedFn(() => {
		console.log(form.get());
	});

	const handleSetValues = useMemoizedFn(() => {
		// form.set({ name: "sdfkjsdlfj", hobit: ["篮球"] });
		form.set("name", "-sd-f");
	});

	const handleClear = useMemoizedFn(() => {
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
			<Form form={form} width={400} className='gap-12'>
				<Field name='name'>
					<Input value={val} onChange={(v) => setVal(v as string)} />
				</Field>

				<Flex className='gap-12'>
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
					<Button
						onClick={() => {
							form?.set("age", 20000);
						}}
					>
						设置AGE的值
					</Button>
				</Flex>
			</Form>
		</>
	);
}
