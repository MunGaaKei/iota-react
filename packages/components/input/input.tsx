import {
    ChangeEvent,
    forwardRef,
    useCallback,
    ReactNode,
    KeyboardEvent,
    useState,
} from "react";
import type { FormControlsAttrs } from "../@types/common";
import { ClearRound } from "@ricons/material";
import "./input.scss";

export type TypeInput = {
    type?: string;
    label?: string;
    value?: string;
    labelInline?: boolean;
    prefix?: ReactNode | string;
    suffix?: ReactNode | string;
    onChange?: Function;
    onEnter?: Function;
} & Omit<FormControlsAttrs, "onChange" | "prefix">;

const Input = forwardRef<HTMLInputElement, TypeInput>((props, ref) => {
    const {
        type = "text",
        label,
        value = "",
        prefix,
        suffix,
        onChange,
        onEnter,
        spellCheck = false,
        ...rest
    } = props;
    const [val, setVal] = useState<string>(value);

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value, e);
            setVal(e.target.value);
        },
        [onChange]
    );

    const handleKeydown = useCallback(
        (e: KeyboardEvent<HTMLInputElement>) => {
            e.code === "Enter" && onEnter?.();
        },
        [onEnter]
    );

    return (
        <label className="i-input-label">
            {label && <span className="i-input-label-text">{label}</span>}
            <div className="i-input-item">
                {prefix}
                <input
                    type={type}
                    ref={ref}
                    value={val}
                    className="i-input"
                    onChange={handleChange}
                    onKeyDown={handleKeydown}
                    spellCheck={spellCheck}
                    {...rest}
                ></input>
                {suffix}
            </div>
        </label>
    );
});

export default Input;
