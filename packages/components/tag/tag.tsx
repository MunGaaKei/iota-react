import classNames from "classnames";
import "./index.scss";
import { Props } from "./type";

const Tag = (props: Props): JSX.Element => {
	const { hideDot, className, children, ...restProps } = props;

	return (
		<span className={classNames("i-tag", className)} {...restProps}>
			{!hideDot && <span className='i-tag-dot'></span>}
			{children}
		</span>
	);
};

export default Tag;
