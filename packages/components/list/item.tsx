import classNames from "classnames";
import { IItem } from "./type";

function Item(props: IItem) {
	const { active, type, disabled, className, children, ...restProps } = props;

	return (
		<div
			className={classNames("i-list-item", className, {
				"i-list-item-active": active,
				"i-list-option": type === "option",
				disabled,
			})}
			{...restProps}
		>
			{children}
		</div>
	);
}

export default Item;
