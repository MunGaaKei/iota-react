import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import {
	ChangeEvent,
	KeyboardEvent,
	forwardRef,
	useCallback,
	useEffect,
	useRef,
} from "react";
import "../../css/input.css";
import InputContainer from "./container";
import "./index.css";
import type { ITextarea } from "./type";

const Textarea = forwardRef<HTMLTextAreaElement, ITextarea>((props, ref) => {
	const {
		label,
		name,
		value = props.initValue ?? "",
		initValue,
		labelInline,
		className,
		status = "normal",
		message,
		autoSize,
		border,
		style,
		onChange,
		onEnter,
		...restProps
	} = props;

	const state = useReactive({
		value,
		status,
		message,
	});
	const refTextarea = useRef<HTMLDivElement>(null);

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const v = e.target.value;
			Object.assign(state, {
				status,
				message,
				value: v,
			});

			const ta = refTextarea.current?.firstChild as HTMLElement;
			if (autoSize && ta) {
				ta.style.height = "inherit";
				ta.style.height = `${ta.scrollHeight}px`;
			}

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

	useEffect(() => {
		state.value = value;
	}, [value]);

	const { status: sts, message: msg, value: v } = state;
	const inputProps = {
		ref,
		name,
		value: v,
		className: "i-input i-textarea",
		onChange: handleChange,
		onKeyDown: handleKeydown,
		...restProps,
	};

	return (
		<InputContainer
			label={label}
			labelInline={labelInline}
			className={className}
			style={style}
		>
			<div
				ref={refTextarea}
				className={classNames("i-input-item", {
					[`i-input-${sts}`]: sts !== "normal",
					"i-input-borderless": !border,
				})}
			>
				<textarea {...inputProps} />

				{msg && <span className='i-input-message'>{msg}</span>}
			</div>
		</InputContainer>
	);
});

export default Textarea;
