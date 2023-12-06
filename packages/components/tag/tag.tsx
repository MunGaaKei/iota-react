import classNames from "classnames";
import "./index.scss";
import { Props } from "./type";

const Tag = (props: Props): JSX.Element => {
	const { dot = true, className, children, ...restProps } = props;

	return (
		<span className={classNames("i-tag", className)} {...restProps}>
			{dot && <span className='i-tag-dot'></span>}
			{children}
		</span>
	);
};

export default Tag;
