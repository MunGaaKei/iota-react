import "@p/css/input.scss";
import { useFormRegist } from "@p/js/hooks";
import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import {
	ChangeEvent,
	ForwardRefExoticComponent,
	KeyboardEvent,
	forwardRef,
	useCallback,
	useEffect,
} from "react";
import "./index.scss";
import Textarea from "./textarea";
import type { PropsInput } from "./type";

const BaseInput = forwardRef<HTMLInputElement, PropsInput>((props, ref) => {
	return <input />;
});

export const InputContainer = (props, ref) => {
	const {
		type = "text",
		label,
		name,
		value = "",
		prepend,
		append,
		labelInline,
		className,
		disabled,
		input: Control = BaseInput,
		form,
		status = "normal",
		message,
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
		(e: ChangeEvent<HTMLInputElement>) => {
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

	const { status: iptStatus, message: msg, value: v } = state;

	const componentProps = {
		type,
		ref,
		name,
		value: v,
		className: classNames("i-input", `i-input-${type}`),
		disabled,
		onChange: handleChange,
		onKeyDown: handleKeydown,
		...rest,
	};

	return (
		<label
			className={classNames("i-input-label", className, {
				"i-input-inline": labelInline,
			})}
		>
			{label && <span className='i-input-label-text'>{label}</span>}

			<div
				className={classNames("i-input-item", {
					[`i-input-${iptStatus}`]: iptStatus !== "normal",
				})}
			>
				{prepend}

				<input {...componentProps} />

				{msg && <span className='i-input-message'>{msg}</span>}

				{append}
			</div>
		</label>
	);
};

type InputRefType = ForwardRefExoticComponent<PropsInput> & {
	Textarea: typeof Textarea;
};

const Input = forwardRef(InputContainer) as InputRefType;

Input.Textarea = Textarea;

export default Input;
