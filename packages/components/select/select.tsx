import { Popup } from "@p";
import { useFormRegist } from "@p/js/hooks";
import { formatOption } from "@p/js/utils";
import { TOption, TValue } from "@p/type";
import { UnfoldMoreRound } from "@ricons/material";
import { useReactive } from "ahooks";
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
import { Options } from "./options";
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
		onSelect,
		onChange,
		...rest
	} = props;

	const state = useReactive({
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

	const handleHelperClick = (e: MouseEvent) => {
		e.stopPropagation();

		changeValue(multiple ? [] : "");
	};

	const handleChange = debounce((e: ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value);
	}, 500);

	const { value: val, message: msg, status: sts, loading } = state;
	const hasValue = multiple ? (val as TValue[]).length > 0 : !!val;
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
						options={formattedOptions}
						value={val}
						multiple={multiple}
						filter={!!filter}
						maxDisplay={maxDisplay}
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

					<input type='hidden' ref={ref} value={val} {...rest} />

					{hasValue && !filter ? (
						<div className='i-input i-select'>
							{multiple ? (
								<></>
							) : (
								(activeOption as TOption)?.label
							)}
						</div>
					) : (
						<input
							className='i-input i-select'
							placeholder={placeholder}
							readOnly={!filter}
							onChange={handleChange}
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
