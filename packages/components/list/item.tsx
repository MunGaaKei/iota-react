import classNames from "classnames";
import { IListItem } from "./type";

function Item(props: IListItem) {
	const {
		active,
		type,
		align,
		disabled,
		style = {},
		className,
		children,
		...restProps
	} = props;

	return (
		<li
			className={classNames("i-list-item", className, {
				"i-list-item-active": active,
				"i-list-option": type === "option",
				disabled,
			})}
			style={{ alignItems: align, ...style }}
			{...restProps}
		>
			{children}
		</li>
	);
}

export default Item;
