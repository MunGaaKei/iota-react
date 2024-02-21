import {
	Button,
	Checkbox,
	Flex,
	Form,
	Input,
	Message,
	Radio,
	Select,
} from "@p";
import { useMemoizedFn } from "ahooks";
import { useState } from "react";

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
	const [val, setVal] = useState("");

	const handleSubmit = useMemoizedFn(() => {
		console.log(form.get());
	});

	const handleSetValues = useMemoizedFn(() => {
		form.set("name", "-sd-f");
	});

	const handleClear = useMemoizedFn(() => {
		form.clear();
	});

	const handleValidate = useMemoizedFn(async () => {
		const data = await form.validate();
		// console.log(data);
		// const data = await form.validate("hobit");
		Message({
			content: data ? "✌️ 校验成功" : "😣 校验失败",
			className: data ? "bg-blue" : "bg-pink",
		});
	});

	return (
		<>
			<Form form={form} rules={rules} width={420} className='gap-12'>
				<Field name='name'>
					<Input label='名字' />
				</Field>
				<Field name='password'>
					<Input
						type='password'
						label='密码'
						append={
							<Button
								className='bg-blue'
								onClick={() => form.validate("password")}
							>
								校验
							</Button>
						}
					/>
				</Field>
				<Flex>
					<Field name='age'>
						<Input.Number label='年龄' max={150} min={1} />
					</Field>
					<Field name='weight'>
						<Input.Range label='体重范围' min={0} />
					</Field>
				</Flex>
				<Field name='gender'>
					<Radio
						label='性别'
						options={["男", "女", "无"]}
						labelInline
					/>
				</Field>
				<Field name='hobit'>
					<Checkbox
						label='兴趣'
						options={["足球", "篮球", "棒球", "排球", "橄榄球"]}
						type='switch'
						labelInline
					/>
				</Field>
				<Field name='country'>
					<Select
						label='国家'
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
					/>
				</Field>
				<Field name='desc'>
					<Input.Textarea label='说明' />
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
				</Flex>
			</Form>
		</>
	);
}
