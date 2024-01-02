import { useFormRegist } from "@p/js/hooks";
import { formatOption } from "@p/js/utils";
import { TStatus, TValue } from "@p/type";
import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import { ReactNode, useMemo } from "react";
import "../../css/input.scss";
import "./index.scss";
import CheckboxItem from "./item";
import type { Props } from "./type";

function Checkbox(props: Props) {
	const {
		label,
		name,
		options = [],
		value = [],
		type = "default",
		optionInline = true,
		labelInline,
		disabled,
		form,
		status = "normal",
		message,
		className,
		onChange,
		...restProps
	} = props;

	const state = useReactive<{
		value: TValue[];
		status?: TStatus;
		message?: ReactNode;
	}>({
		value: [],
		status,
		message,
	});

	const formEmit = useFormRegist({
		name,
		form,
		state,
	});

	const formattedOptions = useMemo(() => formatOption(options), [options]);

	const handleChange = useMemoizedFn((checked, opt, e) => {
		Object.assign(state, {
			status: "normal",
			message: "",
		});

		const group = [...state.value];
		const i = group.findIndex((item) => item === opt.value);

		if (checked && i < 0) {
			group.push(opt.value);
		} else if (!checked && i > -1) {
			group.splice(i, 1);
		}

		state.value = group;
		formEmit?.(group);
		onChange?.(group, opt, e);
	});

	return (
		<div
			className={classNames(
				"i-checkbox i-input-label",
				{
					[`i-checkbox-${state.status}`]: state.status !== "normal",
					"i-input-inline": labelInline,
				},

				className
			)}
			{...restProps}
		>
			{label && <span className='i-input-label-text'>{label}</span>}

			<div
				className={classNames("i-checkbox-options", {
					"i-options-block": !optionInline,
				})}
			>
				{formattedOptions.map((option) => {
					return (
						<CheckboxItem
							key={option.value as string}
							name={name}
							value={state.value.includes(option.value)}
							type={type}
							disabled={disabled || option.disabled}
							onChange={(checked, e) =>
								handleChange(checked, option, e)
							}
						>
							{option.label}
						</CheckboxItem>
					);
				})}
			</div>

			{state.message && (
				<span className='i-checkbox-message'>*{state.message}</span>
			)}
		</div>
	);
}

Checkbox.Item = CheckboxItem;

export default Checkbox;
