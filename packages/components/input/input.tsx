import { useFormRegist } from "@p/js/hooks";
import { VisibilityOffRound, VisibilityRound } from "@ricons/material";
import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import {
	ChangeEvent,
	KeyboardEvent,
	forwardRef,
	useCallback,
	useEffect,
	useMemo,
} from "react";
import "../../css/input.scss";
import Helpericon from "../utils/helpericon";
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
		hideClear,
		hideVisible,
		onChange,
		onEnter,
		style,
		...rest
	} = props;

	const state = useReactive({
		value,
		status,
		message,
		type,
		visible: false,
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
				value: v,
			});

			emitForm?.(v);
			onChange?.(v, e);
		},
		[onChange]
	);

	const handleKeydown = useMemoizedFn((e: KeyboardEvent<HTMLElement>) => {
		e.code === "Enter" && onEnter?.();
	});

	const handleHelperClick = () => {
		if (type === "password" && !hideVisible) {
			state.visible = !state.visible;
			state.type = state.visible ? "text" : "password";
			return;
		}

		const v = "";
		emitForm?.(v);
		state.value = v;
		onChange?.(v);
	};

	const HelperIcon = useMemo(() => {
		if (type === "password") {
			return state.visible ? <VisibilityRound /> : <VisibilityOffRound />;
		}

		return undefined;
	}, [state.visible]);

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
		type: state.type,
		name,
		value: v,
		className: classNames("i-input", `i-input-${type}`),
		onChange: handleChange,
		onKeyDown: handleKeydown,
		...rest,
	};

	const clearable = !hideClear && v;

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
				})}
			>
				{prepend && <div className='i-input-prepend'>{prepend}</div>}

				<input {...inputProps} />

				<Helpericon
					active={!!clearable}
					icon={HelperIcon}
					onClick={handleHelperClick}
				/>

				{msg && <span className='i-input-message'>{msg}</span>}

				{append && <div className='i-input-append'>{append}</div>}
			</div>
		</InputContainer>
	);
});

export default Input;
