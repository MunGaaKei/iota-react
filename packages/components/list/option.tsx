import classNames from "classnames";
import { IOption } from "./type";

function Option(props: IOption) {
	const { active, className, children, ...rest } = props;

	return (
		<div
			className={classNames("i-list-item i-list-option", className, {
				"i-list-option-active": active,
			})}
			{...rest}
		>
			{children}
		</div>
	);
}

export default Option;
