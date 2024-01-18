import { useFormRegist } from "@p/js/hooks";
import { formatNumber } from "@p/js/utils";
import { MinusRound, PlusRound } from "@ricons/material";
import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import { clamp } from "lodash";
import {
	ChangeEvent,
	FocusEvent,
	forwardRef,
	useCallback,
	useEffect,
} from "react";
import "../../css/input.scss";
import Helpericon from "../utils/helpericon";
import InputContainer from "./container";
import "./index.scss";
import type { IInputNumber } from "./type";

const Number = forwardRef<HTMLInputElement, IInputNumber>((props, ref) => {
	const {
		label,
		name,
		value = "",
		labelInline,
		step = 1,
		min = -Infinity,
		max = Infinity,
		thousand,
		decimal,
		type,
		className,
		form,
		status = "normal",
		append,
		prepend,
		message,
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

	const emitForm = useFormRegist({
		form,
		name,
		state,
	});

	const getRangeNumber = useCallback(
		(v: number) => clamp(v, min, max),
		[min, max]
	);

	const getFormatNumber = useCallback(
		(v: number) => formatNumber(v, { decimal, thousand }),
		[decimal, thousand]
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
			status: "normal",
			message: "",
			value: v,
		});

		onChange?.(v, e);
	});

	const handleOperate = useMemoizedFn((param: number) => {
		const value = formatInputValue(state.value) ?? 0;
		const result = getRangeNumber(+value + param);

		state.value = getFormatNumber(result);

		emitForm?.(result);
		onChange?.(result);
	});

	const handleBlur = useMemoizedFn((e: FocusEvent<HTMLInputElement>) => {
		onBlur?.(e);

		const { value } = e.target;
		if (value === "") return;

		const v = +formatInputValue(value);
		const result = isNaN(v) ? "" : getRangeNumber(v);

		state.value = result ? getFormatNumber(result) : result;

		emitForm?.(result);
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
		onBlur: handleBlur,
		...rest,
	};

	return (
		<InputContainer
			label={label}
			labelInline={labelInline}
			className={className}
		>
			<div
				className={classNames("i-input-item", {
					[`i-input-${sts}`]: sts !== "normal",
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
