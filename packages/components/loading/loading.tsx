import classNames from "classnames";
import "./index.scss";
import { Props } from "./type";

const Loading = (props: Props): JSX.Element => {
	const { icon, text, className, ...rest } = props;

	return (
		<div className={classNames("i-loading-container", className)} {...rest}>
			{icon || <div className='i-loading-icon'></div>}

			{text}
		</div>
	);
};

export default Loading;
