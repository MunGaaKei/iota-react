import {
	ChangeEvent,
	forwardRef,
	useCallback,
	ReactNode,
	KeyboardEvent,
	useState,
} from "react";
import type { FormControlsAttrs } from "../@types/common";
import classNames from "classnames";
import "./input.scss";

export type InputStatus = "error" | "warning" | "normal" | "success";
export interface PropsInput
	extends Omit<FormControlsAttrs, "onChange" | "prefix"> {
	type?: string;
	label?: ReactNode | string;
	value?: string;
	labelInline?: boolean;
	prefix?: ReactNode | string;
	suffix?: ReactNode | string;
	border?: boolean;
	className?: string;
	status?: InputStatus;
	message?: string;
	onChange?: Function;
	onEnter?: Function;
}

const Input = forwardRef<HTMLInputElement, PropsInput>((props, ref) => {
	const {
		type = "text",
		label,
		value = "",
		prefix,
		suffix,
		labelInline,
		onChange,
		onEnter,
		spellCheck = false,
		className = "",
		message,
		status = "normal",
		...rest
	} = props;
	const [val, setVal] = useState<string>(value);

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement>) => {
			onChange?.(e.target.value, e);
			setVal(e.target.value);
		},
		[onChange]
	);

	const handleKeydown = useCallback(
		(e: KeyboardEvent<HTMLInputElement>) => {
			e.code === "Enter" && onEnter?.();
		},
		[onEnter]
	);

	return (
		<label className={classNames("i-input-label", className)}>
			{label && <span className='i-input-label-text'>{label}</span>}
			<div
				className={classNames("i-input-item", {
					[`i-input-${status}`]: status !== "normal",
				})}
			>
				{prefix}
				<input
					type={type}
					ref={ref}
					value={val}
					className='i-input'
					onChange={handleChange}
					onKeyDown={handleKeydown}
					spellCheck={spellCheck}
					{...rest}
				></input>

				{message && <span className='i-input-message'>{message}</span>}

				{suffix}
			</div>
		</label>
	);
});

export default Input;
