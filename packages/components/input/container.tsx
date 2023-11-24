import classNames from "classnames";
import { IInputContainer } from "./type";

export default function InputContainer(props: IInputContainer) {
	const { label, className, labelInline, children } = props;

	return (
		<label
			className={classNames("i-input-label", className, {
				"i-input-inline": labelInline,
			})}
		>
			{label && <span className='i-input-label-text'>{label}</span>}

			{children}
		</label>
	);
}
