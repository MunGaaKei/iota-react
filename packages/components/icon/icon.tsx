import classNames from "classnames";
import { cloneElement, isValidElement } from "react";
import "./index.scss";
import { Props } from "./type";

const Icon = (props: Props) => {
	const {
		icon,
		size = "1.425em",
		rotate,
		style,
		className,
		...restProps
	} = props;

	if (!isValidElement(icon)) return icon;

	const elProps = {
		style: {
			transform: rotate ? `rotate(${rotate}deg)` : undefined,
			...style,
			width: size,
			height: size,
		},
		className: classNames("i-icon", className),
		...restProps,
	};

	return cloneElement(icon, elProps);
};

export default Icon;
