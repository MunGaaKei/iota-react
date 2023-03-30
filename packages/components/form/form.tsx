import { ReactNode, forwardRef } from "react";
import "./form.scss";

export type TypeForm = {
    children?: ReactNode;
};

const Form = forwardRef<HTMLFormElement, TypeForm>(
    (props, ref): JSX.Element => {
        const { children } = props;

        return <form ref={ref}>{children}</form>;
    }
);

export default Form;
