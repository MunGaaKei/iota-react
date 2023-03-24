import { HTMLAttributes } from "react";

export type HTMLAttrs = HTMLAttributes<HTMLElement>;

export type FormControlsAttrs = HTMLAttributes<HTMLInputElement> & {
    type?: string;
    name?: string;
    readOnly?: boolean;
};
