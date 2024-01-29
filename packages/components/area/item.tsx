import classNames from "classnames";
import { IAreaItem } from "./type";

function Item(props: IAreaItem) {
	const { name = "content", style, className, children } = props;

	return (
		<div
			className={classNames(`i-area-${name}`, className)}
			style={{ gridArea: name, ...style }}
		>
			{children}
		</div>
	);
}

export default Item;
