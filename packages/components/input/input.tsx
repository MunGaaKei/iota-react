import "@p/css/input.scss";
import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import {
	ChangeEvent,
	KeyboardEvent,
	forwardRef,
	useEffect,
	useState,
} from "react";
import "./index.scss";
import { Props } from "./type";

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
	const {
		type = "text",
		label,
		name,
		value = "",
		prefix,
		suffix,
		labelInline,
		className = "",
		form,
		status: propStatus = {},
		onChange,
		onEnter,
		...rest
	} = props;

	const [val, setVal] = useState(value);
	const inputStatus = useReactive({
		status: "normal",
		message: "",
	});

	const handleChange = useMemoizedFn((e: ChangeEvent<HTMLInputElement>) => {
		const v = e.target.value;
		Object.assign(inputStatus, {
			status: "normal",
			message: "",
		});

		setVal(v);
		onChange?.(v, e);
	});

	const handleKeydown = useMemoizedFn((e: KeyboardEvent<HTMLElement>) => {
		e.code === "Enter" && onEnter?.();
	});

	useEffect(() => {
		Object.assign(inputStatus, propStatus);
	}, [propStatus.status, propStatus.message]);

	const { status, message } = inputStatus;

	return (
		<label
			className={classNames("i-input-label", className, {
				"i-input-inline": labelInline,
			})}
		>
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
					name={name}
					value={val}
					className={classNames("i-input", {
						["i-input-filled"]: !!val,
					})}
					onChange={handleChange}
					onKeyDown={handleKeydown}
					{...rest}
				></input>

				{message && <span className='i-input-message'>{message}</span>}

				{suffix}
			</div>
		</label>
	);
});

export default Input;
