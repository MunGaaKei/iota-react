import { clamp, formatNumber } from "@p/js/utils";
import { MinusRound, PlusRound } from "@ricons/material";
import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import { ChangeEvent, forwardRef, useCallback, useEffect } from "react";
import "../../css/input.css";
import Helpericon from "../utils/helpericon";
import InputContainer from "./container";
import "./index.css";
import type { IInputNumber } from "./type";

const Number = forwardRef<HTMLInputElement, IInputNumber>((props, ref) => {
	const {
		label,
		name,
		value = props.initValue ?? "",
		initValue,
		labelInline,
		step = 1,
		min = -Infinity,
		max = Infinity,
		thousand,
		precision,
		type,
		className,
		status = "normal",
		append,
		border,
		prepend,
		message,
		style,
		onChange,
		onEnter,
		onInput,
		onBlur,
		...rest
	} = props;

	const state = useReactive({
		value,
		status,
		message,
	});

	const getRangeNumber = useCallback(
		(v: number) => clamp(v, min, max),
		[min, max]
	);

	const getFormatNumber = useCallback(
		(v: number) => formatNumber(v, { precision, thousand }),
		[precision, thousand]
	);

	const formatInputValue = useCallback(
		(v?: string | number) => {
			if (!v) return "";
			if (typeof v === "number" || !thousand) return v;

			return v.replaceAll(thousand, "");
		},
		[thousand]
	);

	const handleChange = useMemoizedFn((e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		const v = formatInputValue(value.replace(/[^\d\.-]/g, ""));

		Object.assign(state, {
			status,
			message,
			value: v,
		});

		onChange?.(+v, e);
	});

	const handleOperate = useMemoizedFn((param: number) => {
		const value = formatInputValue(state.value) ?? 0;
		const result = getRangeNumber(+value + param);

		state.value = getFormatNumber(result);

		onChange?.(result);
	});

	useEffect(() => {
		Object.assign(state, {
			status,
			message,
		});
	}, [status, message]);

	useEffect(() => {
		state.value = value;
	}, [value]);

	const { status: sts, message: msg, value: v } = state;
	const inputProps = {
		ref,
		name,
		value: v,
		className: "i-input i-input-number",
		onChange: handleChange,
		...rest,
	};

	return (
		<InputContainer
			label={label}
			labelInline={labelInline}
			className={className}
			style={style}
		>
			<div
				className={classNames("i-input-item", {
					[`i-input-${sts}`]: sts !== "normal",
					"i-input-borderless": !border,
				})}
			>
				{prepend && <div className='i-input-prepend'>{prepend}</div>}

				<Helpericon
					active
					icon={<MinusRound />}
					onClick={() => handleOperate(-step)}
				/>

				<input {...inputProps} />

				<Helpericon
					active
					icon={<PlusRound />}
					onClick={() => handleOperate(step)}
				/>

				{msg && <span className='i-input-message'>{msg}</span>}

				{append && <div className='i-input-append'>{append}</div>}
			</div>
		</InputContainer>
	);
});

export default Number;
