import classNames from "classnames";
import "./index.scss";
import { Props } from "./type";

const Loading = (props: Props): JSX.Element => {
	const { text, className, ...rest } = props;

	return (
		<div className={classNames("loading-container", className)} {...rest}>
			<div className='i-loading-icon'></div>
			<span className='loading-text'>{text}</span>
		</div>
	);
};

export default Loading;
