import { Icon, List, Loading, Popup } from "@p";
import { useFormRegist } from "@p/js/hooks";
import { formatOption } from "@p/js/utils";
import { TOption, TValidate, TValue } from "@p/type";
import { ClearRound, UnfoldMoreRound } from "@ricons/material";
import { useReactive } from "ahooks";
import classNames from "classnames";
import {
	MouseEvent,
	ReactNode,
	forwardRef,
	useCallback,
	useMemo,
	useState,
} from "react";
import "../../css/input.scss";
import "./index.scss";
import { Props } from "./type";

interface IOptions {
	active?: TValue;
	options: TOption[];
	onSelect?: (v: TValue, option: TOption) => void;
}

interface IDisplayIcon {
	loading?: boolean;
	clearable?: boolean;
	onClear?: (e: MouseEvent) => void;
}

const Options = (props: IOptions) => {
	const { active, options, onSelect } = props;

	return (
		<div className='i-select-options'>
			{options.map((option, i) => {
				const { label, value } = option;

				return (
					<List.Option
						key={(value as string) || i}
						active={active === value}
						onClick={() => onSelect?.(value, option)}
					>
						{label}
					</List.Option>
				);
			})}
		</div>
	);
};

const DisplayIcon = (props: IDisplayIcon) => {
	const { loading, clearable, onClear } = props;
	const state: {
		icon?: ReactNode;
		className?: string;
	} = {};

	switch (true) {
		case clearable:
			state.icon = <ClearRound />;
			state.className = "i-select-clear";
			break;
		case loading:
			state.icon = <Loading />;
			break;
		default:
			state.icon = <UnfoldMoreRound />;
			break;
	}

	return (
		<Icon
			icon={state.icon}
			className={classNames("i-select-spin", state.className)}
			onClick={onClear}
		/>
	);
};

const renderOptions = (options: TOption[] = [], value: TValue[] = []) =>
	options.filter((opt) => value.includes(opt.value)).map((opt) => opt.label);

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
		state.value = v;
		onChange?.(value);
		emitForm?.(value);
	};

	const handleSelect = useCallback((value: TValue, option: TOption) => {
		onSelect?.(value, option);
		setActive(false);

		changeValue(value);
	}, []);

	const handleOpen = () => {
		setActive(true);
	};

	const handleClear = (e: MouseEvent) => {
		e.stopPropagation();

		changeValue(multiple ? [] : "");
	};

	const { value: val, message: msg, status: sts, loading } = state;

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
						active={val}
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

					{!!val ? (
						<div className='i-input i-select'>
							{multiple
								? renderOptions(
										formattedOptions,
										val as string[]
								  )
								: (activeOption as TOption)?.label}
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
						clearable={clear && !!val}
						onClear={handleClear}
					/>

					{append}
				</div>
			</Popup>
		</label>
	);
});

export default Select;
