import classNames from "classnames";
import { useEffect } from "react";
import "./index.scss";
import { Props } from "./type";
import useForm from "./useForm";

const Form = (props: Props): JSX.Element => {
	const {
		form,
		rules = {},
		initialValues = {},
		style,
		className,
		width,
		children,
		...rest
	} = props;

	useEffect(() => {
		if (!form) return;

		form.rules = rules;
		form.set(initialValues);
	}, [form]);

	return (
		<form
			style={{ ...style, width }}
			className={classNames("i-form", className)}
			{...rest}
		>
			{children}
		</form>
	);
};

Form.useForm = useForm;

export default Form;
