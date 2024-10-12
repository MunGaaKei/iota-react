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
		tip,
		autoSize,
		border,
		style,
		onChange,
		onEnter,
		...restProps
	} = props;

	const state = useReactive({
		value,
	});
	const refTextarea = useRef<HTMLDivElement>(null);

	const handleChange = useCallback(
		(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const v = e.target.value;

			state.value = v;

			const ta = refTextarea.current?.firstChild as HTMLElement;
			if (autoSize && ta) {
				// ta.style.height = "inherit";
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
		state.value = value;
	}, [value]);

	const inputProps = {
		ref,
		name,
		value: state.value,
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
			tip={message ?? tip}
			status={status}
		>
			<div
				ref={refTextarea}
				className={classNames("i-input-item", {
					[`i-input-${status}`]: status !== "normal",
					"i-input-borderless": !border,
				})}
			>
				<textarea {...inputProps} />
			</div>
		</InputContainer>
	);
});

export default Textarea;
