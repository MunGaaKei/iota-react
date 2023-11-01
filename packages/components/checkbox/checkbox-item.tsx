import { useFormRegist } from "@p/js/hooks";
import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import { ChangeEvent, useEffect } from "react";
import "./index.scss";
import { PropsItem } from "./type";

export default function CheckboxItem(props: PropsItem) {
	const {
		type = "default",
		label,
		name,
		value = false,
		className,
		form,
		status,
		message,
		children,
		onChange,
		...restProps
	} = props;

	const state = useReactive({
		value,
		status,
		message,
	});

	const formEmit = useFormRegist({
		form,
		name,
		state,
	});

	const handleChange = useMemoizedFn((e: ChangeEvent<HTMLInputElement>) => {
		const checked = e.target.checked;
		console.log(checked);

		Object.assign(state, {
			value: checked,
			status: "normal",
			message: "",
		});

		formEmit?.(checked);
		onChange?.(checked, e);
	});

	useEffect(() => {
		state.value = value;
	}, [value]);

	return (
		<label
			className={classNames(
				"i-checkbox-item",
				{
					[`i-checkbox-${state.status}`]: state.status !== "normal",
				},
				className
			)}
			{...restProps}
		>
			<input
				type='checkbox'
				name={name}
				className={classNames("i-checkbox-input", `i-checkbox-${type}`)}
				checked={state.value}
				onChange={handleChange}
			/>

			<span className='i-checkbox-text'>{children || label}</span>

			{state.message && (
				<span className='i-checkbox-message'>*{state.message}</span>
			)}
		</label>
	);
}
