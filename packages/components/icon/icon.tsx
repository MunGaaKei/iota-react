import { ReactNode } from "react";
import "./icon.scss";

export interface PropsIcon {
	size?: string;
	classname?: string;
	children?: ReactNode;
}

const format = (
	node: any,
	{ size = "1.5em", classname = "" }: PropsIcon
): JSX.Element => {
	return node.type.render({
		width: size,
		height: size,
		className: `i-icon ${classname}`,
	});
};

const Icon = ({ children, ...res }: PropsIcon): JSX.Element => {
	return children ? format(children, res) : <></>;
};

export default Icon;
