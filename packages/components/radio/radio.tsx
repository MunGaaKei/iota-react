import { useFormRegist } from "@p/js/hooks";
import { TOption, TStatus, TValue } from "@p/type";
import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import { useEffect } from "react";
import "./index.scss";
import RadioItem from "./item";
import { Props } from "./type";

function Radio(props: Props) {
	const {
		label,
		name,
		options,
		value,
		type = "default",
		form,
		status,
		message,
		children,
		optionInline,
		labelInline,
		disabled,
		className,
		onChange,
	} = props;

	const state = useReactive<{
		value: TValue[];
		status?: TStatus;
		message?: string;
		options: TOption[];
	}>({
		value: [],
		status,
		message,
		options: [],
	});

	const formEmit = useFormRegist({
		name,
		form,
		state,
	});

	const handleChange = useMemoizedFn((value, e) => {
		Object.assign(state, {
			status: "normal",
			message: "",
		});

		state.value = value;
		formEmit?.(value);
		onChange?.(value, e);
	});

	useEffect(() => {
		if (!options.length) return;

		state.options = options.map((opt) =>
			["string", "number"].includes(typeof opt)
				? {
						label: opt,
						value: opt,
				  }
				: opt
		) as TOption[];
	}, [options]);

	return (
		<div className={classNames("i-radio", className)}>
			{label && <span className='i-radio-label'>{label}</span>}

			<div className='i-radio-options'>
				{state.options.map((option) => (
					<RadioItem
						key={option.value as string}
						name={name}
						value={option.value}
						checked={state.value === option.value}
						type={type}
						onChange={handleChange}
					>
						{option.label}
					</RadioItem>
				))}
			</div>
		</div>
	);
}

Radio.Item = RadioItem;

export default Radio;
