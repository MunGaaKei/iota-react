import classNames from "classnames";
import { ChangeEvent } from "react";
import { PropsItem } from "./type";

export default function RadioItem(props: PropsItem) {
	const { type, name, value, checked, children, onChange } = props;

	const handleChange = (e: ChangeEvent) => {
		onChange?.(value, e);
	};

	return (
		<label className='i-radio-item'>
			<input
				type='radio'
				name={name}
				checked={checked}
				className={classNames("i-radio-input", `i-radio-${type}`)}
				onChange={handleChange}
			/>

			<span className='i-radio-text'>{children}</span>
		</label>
	);
}
