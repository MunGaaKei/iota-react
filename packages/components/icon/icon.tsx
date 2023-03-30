import { ReactNode } from "react";
import "./icon.scss";

export type TypeIconTarget = {
    size?: string;
    style?: string;
    classname?: string;
};

export type TypeIcon = {
    children?: ReactNode;
} & TypeIconTarget;

const format = (
    node: any,
    { size = "1.5em", style, classname = "" }: TypeIconTarget
): JSX.Element => {
    return node.type.render({
        style,
        width: size,
        height: size,
        className: `i-icon ${classname}`,
    });
};

const Icon = ({ children, ...res }: TypeIcon): JSX.Element => {
    return children ? format(children, res) : <></>;
};

export default Icon;
