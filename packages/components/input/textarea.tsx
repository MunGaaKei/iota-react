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
import type { PropsTextarea } from "./type";

const Textarea = forwardRef<HTMLTextAreaElement, PropsTextarea>(
	(props, ref) => {
		const {
			label,
			name,
			value = "",
			labelInline,
			className = "",
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
	}
);

export default Textarea;
