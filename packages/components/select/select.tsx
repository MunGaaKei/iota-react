import { Icon, List, Popup } from "@p";
import { formatOption } from "@p/js/utils";
import { UnfoldMoreRound } from "@ricons/material";
import classNames from "classnames";
import { forwardRef, useCallback, useMemo, useState } from "react";
import "../../css/input.scss";
import "./index.scss";
import { Props } from "./type";

const Option = (props) => {
	const { value, active, children, ...rest } = props;

	return (
		<List.Option
			active={active === value}
			className='i-select-option'
			{...rest}
		>
			{children}
		</List.Option>
	);
};

const Options = (props) => {
	const { active, options, onSelect } = props;

	return (
		<div className='i-select-options'>
			{options.map((option) => {
				const { label, value } = option;

				return (
					<Option
						key={value}
						active={active === value}
						className='i-select-option'
						onClick={() => onSelect(value, option)}
					>
						{label}
					</Option>
				);
			})}
		</div>
	);
};

const renderOptions = (options = [], value = [], config = {}) => {
	return options
		.filter((opt) => value.includes(opt.value))
		.map((opt) => opt.label);
};

const Select = forwardRef<HTMLInputElement, Props>((props, ref) => {
	const {
		type = "text",
		label,
		value = "",
		placeholder = " ",
		options = [],
		prepend,
		append,
		labelInline,
		className = "",
		message,
		status = "normal",
		onSelect,
		...rest
	} = props;

	const [active, setActive] = useState(false);
	const computedOptions = useMemo(() => formatOption(options), [options]);
	const multiple = useMemo(() => Array.isArray(value), [value]);

	const activeOption = useMemo(() => {
		return multiple
			? options.filter((opt) => value.includes(opt.value))
			: options.find((opt) => opt.value === value);
	}, [value, options]);

	const handleSelect = useCallback((value, option) => {
		onSelect?.(value, option);
		setActive(false);
	}, []);

	return (
		<label
			className={classNames("i-input-label", className, {
				"i-input-inline": labelInline,
			})}
		>
			{label && <span className='i-input-label-text'>{label}</span>}

			<Popup
				visible={active}
				trigger='click'
				position='bottom'
				fitWidth
				onVisibleChange={setActive}
				content={
					<Options
						options={computedOptions}
						active={value}
						onSelect={handleSelect}
					/>
				}
			>
				<div
					className={classNames("i-input-item", {
						[`i-input-${status}`]: status !== "normal",
					})}
				>
					{prepend}

					<input
						type='hidden'
						ref={ref}
						value={value}
						{...rest}
					></input>

					{!!value ? (
						<div className='i-input i-select'>
							{multiple
								? renderOptions(options, value)
								: activeOption?.label}
						</div>
					) : (
						<input
							className='i-input i-select'
							placeholder={placeholder}
						/>
					)}

					{message && (
						<span className='i-input-message'>{message}</span>
					)}

					<Icon
						icon={<UnfoldMoreRound />}
						className='i-select-caret'
						size='1.5em'
					/>

					{append}
				</div>
			</Popup>
		</label>
	);
});

export default Select;
