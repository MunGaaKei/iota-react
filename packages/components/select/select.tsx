import { Popup } from "@p";
import { useFormRegist } from "@p/js/hooks";
import { formatOption } from "@p/js/utils";
import { TOption, TValidate, TValue } from "@p/type";
import { useReactive } from "ahooks";
import classNames from "classnames";
import { MouseEvent, forwardRef, useCallback, useMemo, useState } from "react";
import "../../css/input.scss";
import { DisplayIcon, DisplayValues, Options, activeLabels } from "./display";
import "./index.scss";
import { Props } from "./type";

const Select = forwardRef<HTMLInputElement, Props>((props, ref) => {
	const {
		type = "text",
		name,
		label,
		value = "",
		placeholder = " ",
		options = [],
		multiple,
		prepend,
		append,
		labelInline,
		className = "",
		form,
		message,
		status = "normal",
		clear,
		maxDisplay,
		onSelect,
		onChange,
		...rest
	} = props;

	const state = useReactive<
		{
			value: TValue;
			loading: boolean;
		} & TValidate
	>({
		value,
		status,
		message,
		loading: false,
	});

	const emitForm = useFormRegist({
		form,
		name,
		state,
	});

	const [active, setActive] = useState<boolean>(false);

	const formattedOptions = useMemo(() => formatOption(options), [options]);

	const activeOption = useMemo(() => {
		return multiple
			? formattedOptions.filter((opt) =>
					(state.value as TValue[])?.includes(opt.value)
			  )
			: formattedOptions.find((opt) => opt.value === state.value);
	}, [state.value, formattedOptions]);

	const changeValue = (v: TValue) => {
		Object.assign(state, {
			value: v,
			status: "normal",
			message: "",
		});

		onChange?.(v);
		emitForm?.(v);
	};

	const handleSelect = useCallback((value: TValue, option: TOption) => {
		onSelect?.(value, option);

		if (multiple) {
			const values = [...(state.value as TValue[])];
			const i = values.findIndex((v) => v === value);

			i > -1 ? values.splice(i, 1) : values.push(value);
			changeValue(values as TValue);

			return;
		}

		setActive(false);
		changeValue(value);
	}, []);

	const handleOpen = () => {
		setActive(true);
	};

	const handleSpinClick = (e: MouseEvent) => {
		e.stopPropagation();

		changeValue(multiple ? [] : "");
	};

	const { value: val, message: msg, status: sts, loading } = state;
	const hasValue = multiple ? (val as TValue[]).length > 0 : !!val;

	return (
		<label
			className={classNames("i-input-label", className, {
				"i-input-inline": labelInline,
			})}
		>
			{label && <span className='i-input-label-text'>{label}</span>}

			<Popup
				visible={active}
				trigger='none'
				position='bottom'
				fitWidth
				onVisibleChange={setActive}
				content={
					<Options
						options={formattedOptions}
						value={val}
						multiple={multiple}
						onSelect={handleSelect}
					/>
				}
			>
				<div
					className={classNames("i-input-item", {
						[`i-input-${sts}`]: sts !== "normal",
					})}
					onClick={handleOpen}
				>
					{prepend}

					<input
						type='hidden'
						ref={ref}
						value={val}
						{...rest}
					></input>

					{hasValue ? (
						<div className='i-input i-select'>
							{multiple ? (
								<DisplayValues
									values={activeLabels(
										formattedOptions,
										val as string[]
									)}
									max={maxDisplay}
								/>
							) : (
								(activeOption as TOption)?.label
							)}
						</div>
					) : (
						<input
							className='i-input i-select'
							placeholder={placeholder}
						/>
					)}

					{msg && <span className='i-input-message'>{msg}</span>}

					<DisplayIcon
						loading={loading}
						clearable={clear && active && hasValue}
						onClick={handleSpinClick}
					/>

					{append}
				</div>
			</Popup>
		</label>
	);
});

export default Select;