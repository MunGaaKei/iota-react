import classNames from "classnames";
import { IItem } from "./type";

function Item(props: IItem) {
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
		<div
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
		</div>
	);
}

export default Item;
