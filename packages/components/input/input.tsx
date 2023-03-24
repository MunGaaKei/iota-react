import {
    ChangeEvent,
    forwardRef,
    useCallback,
    HTMLInputTypeAttribute,
} from "react";
import type { FormControlsAttrs } from "../@types/common";
import "./input.scss";

export type TypeInput = {
    label?: string;
    value?: string;
    onChange?: Function;
    labelInline?: boolean;
} & Omit<FormControlsAttrs, "onChange">;

const Input = forwardRef<HTMLInputElement, TypeInput>((props, ref) => {
    const { label, value = "", onChange, spellCheck = false, ...rest } = props;

    const handleChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target?.value, e);
        },
        [onChange]
    );

    return (
        <label className="i-input-item">
            {label && <span className="i-form-label">{label}</span>}
            <input
                ref={ref}
                value={value}
                className="i-input"
                onChange={handleChange}
                spellCheck={spellCheck}
                {...rest}
            ></input>
        </label>
    );
});

export default Input;
