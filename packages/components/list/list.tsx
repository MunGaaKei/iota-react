import classNames from "classnames";
import "./index.css";
import Item from "./item";
import { IList } from "./type";

const List = (props: IList): JSX.Element => {
	const { virtual, className, children, ...restProps } = props;

	return (
		<ul className={classNames("i-list", className)} {...restProps}>
			{children}
		</ul>
	);
};

List.Item = Item;

export default List;
