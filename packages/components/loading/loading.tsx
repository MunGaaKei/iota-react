import classNames from "classnames";
import "./index.scss";
import { ILoading } from "./type";

const Loading = (props: ILoading): JSX.Element => {
	const { icon, text, absolute = true, className, ...rest } = props;

	return (
		<div
			className={classNames(
				"i-loading-container",
				{
					"i-loading-static": !absolute,
				},
				className
			)}
			{...rest}
		>
			{icon || <div className='i-loading-icon'></div>}

			{text}
		</div>
	);
};

export default Loading;
