import { useFormRegist } from "@p/js/hooks";
import { formatOption } from "@p/js/utils";
import { TStatus, TValue } from "@p/type";
import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import { useMemo } from "react";
import "../../css/input.scss";
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
		status = "normal",
		message,
		optionInline = true,
		labelInline,
		disabled,
		className,
		onChange,
	} = props;

	const state = useReactive<{
		value: TValue;
		status?: TStatus;
		message?: string;
	}>({
		value,
		status,
		message,
	});

	const formEmit = useFormRegist({
		name,
		form,
		state,
	});

	const formattedOptions = useMemo(() => formatOption(options), [options]);

	const handleChange = useMemoizedFn((value, e) => {
		Object.assign(state, {
			status: "normal",
			message: "",
		});

		state.value = value;
		formEmit?.(value);
		onChange?.(value, e);
	});

	return (
		<div
			className={classNames(
				"i-radio i-input-label",
				{
					[`i-radio-${state.status}`]: state.status !== "normal",
					"i-input-inline": labelInline,
				},
				className
			)}
		>
			{label && <span className='i-input-label-text'>{label}</span>}

			<div
				className={classNames("i-radio-options", {
					"i-options-block": !optionInline,
					"i-radio-options-button": type === "button",
				})}
			>
				{formattedOptions.map((option) => (
					<RadioItem
						key={option.value as string}
						name={name}
						value={option.value}
						checked={state.value === option.value}
						type={type}
						disabled={disabled || option.disabled}
						onChange={handleChange}
					>
						{option.label}
					</RadioItem>
				))}
			</div>

			{state.message && (
				<span className='i-radio-message'>*{state.message}</span>
			)}
		</div>
	);
}

Radio.Item = RadioItem;

export default Radio;
