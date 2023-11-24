import { useFormRegist } from "@p/js/hooks";
import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import {
	ChangeEvent,
	KeyboardEvent,
	forwardRef,
	useCallback,
	useEffect,
} from "react";
import "../../css/input.scss";
import InputContainer from "./container";
import "./index.scss";
import type { Props } from "./type";

const Input = forwardRef<HTMLInputElement, Props>((props, ref) => {
	const {
		type = "text",
		label,
		name,
		value = "",
		prepend,
		append,
		labelInline,
		className = "",
		form,
		status = "normal",
		message,
		clear,
		onChange,
		onEnter,
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

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const v = e.target.value;
			Object.assign(state, {
				status: "normal",
				message: "",
			});

			emitForm?.(v);
			state.value = v;
			onChange?.(v, e);
		},
		[onChange]
	);

	const handleKeydown = useMemoizedFn((e: KeyboardEvent<HTMLElement>) => {
		e.code === "Enter" && onEnter?.();
	});

	useEffect(() => {
		Object.assign(state, {
			status,
			message,
		});
	}, [status, message]);

	const { status: sts, message: msg, value: v } = state;
	const inputProps = {
		ref,
		type,
		name,
		value: v,
		className: classNames("i-input", `i-input-${type}`),
		onChange: handleChange,
		onKeyDown: handleKeydown,
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

				<input {...inputProps} />

				{msg && <span className='i-input-message'>{msg}</span>}

				{append && <div className='i-input-append'>{append}</div>}
			</div>
		</InputContainer>
	);
});

export default Input;
