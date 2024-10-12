import { formatOption } from "@p/js/utils";
import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import { useEffect, useMemo } from "react";
import "../../css/input.css";
import "./index.css";
import RadioItem from "./item";
import { IRadio } from "./type";

function Radio(props: IRadio) {
	const {
		label,
		name,
		options,
		value,
		type = "default",
		status = "normal",
		message,
		optionInline = true,
		labelInline,
		disabled,
		required,
		className,
		onChange,
	} = props;

	const state = useReactive({
		value,
	});

	const formattedOptions = useMemo(() => formatOption(options), [options]);

	const handleChange = useMemoizedFn((value, e) => {
		state.value = value;
		onChange?.(value, e);
	});

	useEffect(() => {
		state.value = value;
	}, [value]);

	return (
		<div
			className={classNames(
				"i-radio i-input-label",
				{
					[`i-radio-${status}`]: status !== "normal",
					"i-input-inline": labelInline,
				},
				className
			)}
		>
			{label && (
				<span className='i-input-label-text'>
					{required && <span className='error'>*</span>}
					{label}

					{message && <p className='i-radio-message'>{message}</p>}
				</span>
			)}

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
		</div>
	);
}

Radio.Item = RadioItem;

export default Radio;
