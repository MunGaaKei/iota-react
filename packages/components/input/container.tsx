import classNames from "classnames";
import { IInputContainer } from "./type";

export default function InputContainer(props: IInputContainer) {
	const { label, className, labelInline, style, children } = props;

	return (
		<label
			className={classNames("i-input-label", className, {
				"i-input-inline": labelInline,
			})}
			style={style}
		>
			{label && <span className='i-input-label-text'>{label}</span>}

			{children}
		</label>
	);
}
