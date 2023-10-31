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
import "./index.scss";
import { PropsInput } from "./type";

const Input = forwardRef<HTMLInputElement & HTMLTextAreaElement, PropsInput>(
	(props, ref) => {
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
		const InputElement = type === "textarea" ? "textarea" : "input";

		return (
			<label
				className={classNames("i-input-label", className, {
					"i-input-inline": labelInline,
				})}
			>
				{label && <span className='i-input-label-text'>{label}</span>}

				<div
					className={classNames("i-input-item", {
						[`i-input-${sts}`]: sts !== "normal",
					})}
				>
					{prefix}

					<InputElement
						type={type}
						ref={ref}
						name={name}
						value={v}
						className={classNames("i-input", `i-input-${type}`)}
						onChange={handleChange}
						onKeyDown={handleKeydown}
						{...rest}
					/>

					{msg && <span className='i-input-message'>{msg}</span>}

					{suffix}
				</div>
			</label>
		);
	}
);

export default Input;
