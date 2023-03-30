import "./checkbox.scss";
import type { FormControlsAttrs } from "../@types/common";

export type TypeCheckboxValue = string | number | boolean;
export type TypeCheckbox = {
    value: TypeCheckboxValue | TypeCheckboxValue[];
    inline?: boolean;
    optionInline?: boolean;
} & FormControlsAttrs;

const Checkbox = (): JSX.Element => {
    return <label className="i-input-label"></label>;
};

export default Checkbox;
