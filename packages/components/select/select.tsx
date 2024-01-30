import { Popup } from "@p";
import { useFormRegist } from "@p/js/hooks";
import { formatOption } from "@p/js/utils";
import { TOption } from "@p/type";
import { UnfoldMoreRound } from "@ricons/material";
import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import { debounce } from "lodash";
import {
	ChangeEvent,
	MouseEvent,
	forwardRef,
	useCallback,
	useMemo,
	useState,
} from "react";
import "../../css/input.scss";
import Helpericon from "../utils/helpericon";
import "./index.scss";
import { Options, displayValue } from "./options";
import { ISelect } from "./type";

const Select = forwardRef<HTMLInputElement, ISelect>((props, ref) => {
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
		style,
		className,
		form,
		message,
		status = "normal",
		hideClear,
		maxDisplay,
		filter,
		filterPlaceholder = "...",
		onSelect,
		onChange,
		...restProps
	} = props;

	const state = useReactive({
		inputValue: "",
		filterValue: "",
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

	const filterOptions = useMemo(() => {
		const { filterValue: fv } = state;
		if (!fv || !filter) return formattedOptions;

		const filterFn =
			typeof filter === "function"
				? filter
				: (opt) => opt.value.includes(fv) || opt.label.includes(fv);

		return formattedOptions.filter(filterFn);
	}, [formattedOptions, filter, state.filterValue]);

	const changeValue = (v: any) => {
		Object.assign(state, {
			value: v,
			status: "normal",
			message: "",
		});

		onChange?.(v);
		emitForm?.(v);
	};

	const handleSelect = useCallback((value: any, option?: TOption) => {
		onSelect?.(value, option);

		if (multiple) {
			const values = [...(state.value as any[])];
			const i = values.findIndex((v) => v === value);

			i > -1 ? values.splice(i, 1) : values.push(value);
			changeValue(values as any);

			return;
		}

		setActive(false);
		changeValue(value);
	}, []);

	const handleOpen = () => {
		if (filter) state.filterValue = "";

		setActive(true);
	};

	const handleHelperClick = (e: MouseEvent) => {
		if (!active) return;
		e.stopPropagation();

		changeValue(multiple ? [] : "");
	};

	const handleInputChange = useMemoizedFn(
		debounce((e: ChangeEvent<HTMLInputElement>) => {
			const v = e.target.value;
			state.filterValue = v;
		}, 500)
	);

	const { value: val, message: msg, status: sts } = state;
	const hasValue = multiple ? (val as any[]).length > 0 : !!val;
	const clearable = !hideClear && active && hasValue;

	return (
		<label
			className={classNames("i-input-label", className, {
				"i-input-inline": labelInline,
			})}
			style={style}
		>
			{label && <span className='i-input-label-text'>{label}</span>}

			<Popup
				visible={active}
				trigger='none'
				position='bottom'
				arrow={false}
				fitSize
				onVisibleChange={setActive}
				content={
					<Options
						options={filterOptions}
						value={val}
						multiple={multiple}
						filter={!!filter}
						filterPlaceholder={filterPlaceholder}
						onSelect={handleSelect}
						onFilter={handleInputChange}
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

					<input ref={ref} type='hidden' value={val} {...restProps} />

					{hasValue ? (
						<div
							className={classNames("i-input i-select", {
								"i-select-multiple": multiple,
							})}
						>
							{displayValue({
								options: formattedOptions,
								value: val,
								multiple,
								maxDisplay,
								onSelect: handleSelect,
							})}
						</div>
					) : (
						<input
							className='i-input i-select'
							placeholder={placeholder}
							readOnly
						/>
					)}

					{msg && <span className='i-input-message'>{msg}</span>}

					<Helpericon
						active
						icon={clearable ? undefined : <UnfoldMoreRound />}
						onClick={handleHelperClick}
					/>

					{append}
				</div>
			</Popup>
		</label>
	);
});

export default Select;
