import classNames from "classnames";
import "./index.scss";
import { Props } from "./type";

const Icon = (props: Props) => {
	const { icon: IconSvg, size = "1.5em", className = "", ...rest } = props;

	return (
		<IconSvg
			width={size}
			height={size}
			className={classNames("icon", className)}
			{...rest}
		></IconSvg>
	);
};

export default Icon;
