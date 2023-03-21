import { ReactNode } from "react";
import "./icon.scss";

type TypeIconProps = {
    size?: string;
    style?: string;
    classname?: string;
};

type TypeProps = {
    children?: ReactNode;
} & TypeIconProps;

const format = (
    node: any,
    { size = "1.5em", style, classname = "" }: TypeIconProps
): JSX.Element => {
    return node.type.render({
        style,
        width: size,
        height: size,
        className: `i-icon ${classname}`,
    });
};

const Icon = ({ children, ...res }: TypeProps): JSX.Element => {
    if (!children) return <></>;

    return format(children, res);
};

export default Icon;
