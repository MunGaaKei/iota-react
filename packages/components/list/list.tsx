import classNames from "classnames";
import "./index.scss";
import Item from "./item";
import { IList } from "./type";

const List = (props: IList): JSX.Element => {
	const { className, children, ...restProps } = props;

	return (
		<ul className={classNames("i-list", className)} {...restProps}>
			{children}
		</ul>
	);
};

List.Item = Item;

export default List;
