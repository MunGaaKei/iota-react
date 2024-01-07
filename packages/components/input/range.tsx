import { useFormRegist } from "@p/js/hooks";
import { formatNumber } from "@p/js/utils";
import { MinusRound, PlusRound, SyncAltRound } from "@ricons/material";
import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import { clamp } from "lodash";
import {
	ChangeEvent,
	FocusEvent,
	MouseEvent,
	useCallback,
	useEffect,
} from "react";
import "../../css/input.scss";
import Helpericon from "../utils/helpericon";
import InputContainer from "./container";
import "./index.scss";
import type { PropsRange } from "./type";

const Range = (props: PropsRange) => {
	const {
		label,
		name,
		value,
		labelInline,
		min = -Infinity,
		max = Infinity,
		type,
		className,
		form,
		status = "normal",
		message,
		append,
		prepend,
		step = 1,
		thousand,
		decimal,
		placeholder,
		onChange,
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

	const handleChange = useMemoizedFn(
		(e: ChangeEvent<HTMLInputElement>, i: number) => {
			const { value } = e.target;
			const v = formatInputValue(value.replace(/[^\d\.-]/g, ""));

			const range = state.value ?? [];
			range[i] = v;

			Object.assign(state, {
				status: "normal",
				message: "",
				value: range,
			});

			onChange?.(range, e);
		}
	);

	const handleBlur = useMemoizedFn(
		(e: FocusEvent<HTMLInputElement>, i: number) => {
			onBlur?.(e);

			const { value } = e.target;
			if (value === "") return;

			const v = +formatInputValue(value);
			const result = isNaN(v) ? "" : getRangeNumber(v);
			const range = state.value ?? [];

			range[i] = result !== "" ? getFormatNumber(result) : result;

			state.value = range;
			emitForm?.(range);
			onChange?.(range);
		}
	);

	const handleOperate = useMemoizedFn(
		(e: MouseEvent, param: number, i: number) => {
			e.preventDefault();
			e.stopPropagation();

			const range = state.value ?? [];
			const value = formatInputValue(range[i]) ?? 0;
			const result = getRangeNumber(+value + param);

			range[i] = getFormatNumber(result);

			state.value = range;
			emitForm?.(range);
			onChange?.(range);
		}
	);

	const handleSwitch = useMemoizedFn((e: MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		const range = state.value ?? [];
		const v = range[0];
		range[0] = range[1];
		range[1] = v;

		state.value = range;
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
		name,
		className: "i-input i-input-number",
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
					onClick={(e) => handleOperate(e, -step, 0)}
				/>

				<input
					value={v?.[0] || ""}
					placeholder={placeholder?.[0]}
					{...inputProps}
					onChange={(e) => handleChange(e, 0)}
					onBlur={(e) => handleBlur(e, 0)}
				/>

				<Helpericon
					active
					icon={<PlusRound />}
					onClick={(e) => handleOperate(e, step, 0)}
				/>
				<Helpericon
					active
					icon={<SyncAltRound />}
					style={{ margin: 0 }}
					onClick={handleSwitch}
				/>
				<Helpericon
					active
					icon={<MinusRound />}
					onClick={(e) => handleOperate(e, -step, 1)}
				/>

				<input
					value={v?.[1] || ""}
					placeholder={placeholder?.[1]}
					{...inputProps}
					onChange={(e) => handleChange(e, 1)}
					onBlur={(e) => handleBlur(e, 1)}
				/>

				<Helpericon
					active
					icon={<PlusRound />}
					onClick={(e) => handleOperate(e, step, 1)}
				/>

				{msg && <span className='i-input-message'>{msg}</span>}

				{append && <div className='i-input-append'>{append}</div>}
			</div>
		</InputContainer>
	);
};

export default Range;
