import { Checkbox, Radio } from "@p";
import { useState } from "react";

export const DBasic = {
	demo: () => {
		const [value, setValue] = useState<any>(["Cat"]);

		return (
			<div>
				<div className='mb-12 green'>{value.join(", ")}</div>
				<Checkbox
					value={value}
					options={["Cat", "Dog", "Kuma"]}
					onChange={setValue}
				/>
			</div>
		);
	},
	code: `const [value, setValue] = useState([]);

return (
    <div>
        <div className='mb-12 green'>{value.join(", ")}</div>
        <Checkbox
            value={value}
            options={["Cat", "Dog", "Kuma"]}
            onChange={setValue}
        />
    </div>
);`,
	lang: "javascript",
};

export const DType = {
	demo: () => {
		const [type, setType] = useState<any>("default");

		return (
			<>
				<Radio
					label='type:'
					value={type}
					options={["default", "switch", "button"]}
					labelInline
					onChange={setType}
				/>
				<Checkbox.Item partof className='mr-12'>
					partof
				</Checkbox.Item>
				<Checkbox.Item type={type} className='mt-12'>
					{type}
				</Checkbox.Item>
			</>
		);
	},
	code: `const [type, setType] = useState<any>("default");

return (
    <>
        <Radio
            label='type:'
            value={type}
            options={["default", "switch", "button"]}
            labelInline
            onChange={setType}
        />

        <Checkbox.Item partof className='mr-12'>
            partof
        </Checkbox.Item>

        <Checkbox.Item type={type} className='mt-12'>
            {type}
        </Checkbox.Item>
    </>
);`,
	lang: "javascript",
};

export const PCheckbox = [
	{
		name: "value",
		desc: "值",
		type: ["any[]"],
		def: "[]",
	},
	{
		name: "options",
		desc: "选项",
		type: [
			<a href='/docs/form#TOption' className='blue'>
				TOption
			</a>,
			"(number | string)[]",
		],
		required: true,
	},
	{
		name: "label",
		desc: "标签",
		type: ["ReactNode"],
	},
	{
		name: "type",
		desc: "类型",
		type: ["default", "switch", "button"],
		def: "'default'",
	},
	{
		name: "optionInline",
		desc: "选项显示为行内元素",
		type: ["boolean"],
		def: "true",
	},
	{
		name: "labelInline",
		desc: "标签与选项显示在同一行",
		type: ["boolean"],
	},
	{
		name: "disabled",
		desc: "禁用状态",
		type: ["boolean"],
		def: "false",
	},
	{
		name: "status",
		desc: "控件状态",
		type: ["normal", "warning", "error", "success"],
		def: "'normal'",
	},
	{
		name: "message",
		desc: "控件显示信息",
		type: ["ReactNode"],
	},
	{
		name: "onChange",
		desc: "值发生改变时触发",
		type: [
			<>
				(value: any[], option:&nbsp;
				<a href='/docs/form#TOption' className='blue'>
					TOption
				</a>
				, e: ChangeEvent&lt;HTMLInputElement&gt; ) =&gt; void
			</>,
		],
		event: true,
	},
];

export const PCheckboxItem = [
	{
		name: "value",
		desc: "值",
		type: ["boolean"],
		def: "false",
	},
	{
		name: "label",
		desc: "标签，也可以写在children里",
		type: ["ReactNode"],
	},
	{
		name: "type",
		desc: "类型",
		type: ["default", "switch", "button"],
		def: "'default'",
	},
	{
		name: "partof",
		desc: "部分选中状态",
		type: ["boolean"],
		def: "false",
	},
	{
		name: "disabled",
		desc: "禁用状态",
		type: ["boolean"],
		def: "false",
	},
	{
		name: "status",
		desc: "控件状态",
		type: ["normal", "warning", "error", "success"],
		def: "'normal'",
	},
	{
		name: "message",
		desc: "控件显示信息",
		type: ["ReactNode"],
	},
	{
		name: "onChange",
		desc: "值发生改变时触发",
		type: ["(value: boolean, e: ChangeEvent<HTMLInputElement>) => void"],
		event: true,
	},
];
