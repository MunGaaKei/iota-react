import classNames from "classnames";
import { IListItem } from "./type";

function Item(props: IListItem) {
	const {
		active,
		type,
		disabled,
		shortcut,
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
			{...restProps}
		>
			{children}

			{shortcut && (
				<div className='i-list-option-shortcut'>{shortcut}</div>
			)}
		</li>
	);
}

export default Item;
