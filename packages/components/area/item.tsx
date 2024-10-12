import classNames from "classnames";
import Scrollbars from "react-custom-scrollbars-2";
import { IAreaItem } from "./type";

function Item(props: IAreaItem) {
	const { name = "content", style, className, children } = props;

	return (
		<Scrollbars
			className={classNames(`i-area-${name}`, className)}
			style={{ gridArea: name, ...style }}
			autoHide
		>
			{children}
		</Scrollbars>
	);
}

export default Item;
