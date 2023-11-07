import "./index.scss";
import Option from "./option";
import { Props } from "./type";

const List = (props: Props): JSX.Element => {
	const { children } = props;

	return <ul>{children}</ul>;
};

List.Option = Option;

export default List;
