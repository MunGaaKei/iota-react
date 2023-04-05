import { HTMLAttributes } from "react";

export type HTMLAttrs = HTMLAttributes<HTMLElement>;

export type FormControlsAttrs = HTMLAttributes<HTMLInputElement> & {
    type?: string;
    name?: string;
    readOnly?: boolean;
    disabled?: boolean;
};

declare module "react" {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        // extends React's HTMLAttributes
        ripple?: string;
    }
}
