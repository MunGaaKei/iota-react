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
import type { ITextarea } from "./type";

const Textarea = forwardRef<HTMLTextAreaElement, ITextarea>((props, ref) => {
	const {
		label,
		name,
		value = "",
		labelInline,
		className = "",
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

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const v = e.target.value;
			Object.assign(state, {
				status: "normal",
				message: "",
				value: v,
			});

			onChange?.(v, e);
		},
		[]
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
		name,
		value: v,
		className: "i-input i-textarea",
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
				<textarea {...inputProps} />

				{msg && <span className='i-input-message'>{msg}</span>}
			</div>
		</InputContainer>
	);
});

export default Textarea;
