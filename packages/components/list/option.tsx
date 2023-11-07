import classNames from "classnames";
import { IOption } from "./type";

function Option(props: IOption) {
	const { active, disabled, className, children, ...rest } = props;

	return (
		<div
			className={classNames("i-list-option", className, {
				"i-list-option-active": active,
				disabled,
			})}
			{...rest}
		>
			{children}
		</div>
	);
}

export default Option;
