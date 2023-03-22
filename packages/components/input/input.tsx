import {
    ChangeEvent,
    forwardRef,
    HTMLAttributes,
    useCallback,
    HTMLInputTypeAttribute,
} from "react";
import "./input.scss";

export type TypeInput = {
    label?: string;
    type?: HTMLInputTypeAttribute;
    value?: string;
    name?: string;
    labelInline?: boolean;
    readOnly?: boolean;
    onChange?: Function;
} & Omit<HTMLAttributes<HTMLInputElement>, "onChange">;

const Input = forwardRef<HTMLInputElement, TypeInput>((props, ref) => {
    const { label, name, value, readOnly, onChange, ...rest } = props;

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
                name={name}
                value={value}
                className="i-input"
                readOnly={readOnly}
                onChange={handleChange}
                {...rest}
            ></input>
        </label>
    );
});

export default Input;
