import { ReactNode, HTMLAttributes } from "react";
import classnames from "classnames";
import "./button.scss";

export type TypeButton = {
    tag?: "button" | "a";
    href?: string;
    outline?: boolean;
    flat?: boolean;
    loading?: boolean;
    ripple?: boolean;
    disabled?: boolean;
    size?: "small" | "large" | "normal" | "thin" | "extreme";
    block?: boolean;
    round?: boolean;
    Link?: Function;
    children: ReactNode;
} & HTMLAttributes<HTMLElement>;

const formatClass = ({
    outline,
    flat,
    loading,
    disabled,
    size = "normal",
    block,
    round,
    className = "",
}: TypeButton): string =>
    classnames("i-btn", className, {
        "i-btn-outline": outline,
        "i-btn-flat": flat,
        "i-btn-block": block,
        "i-btn-loading": loading,
        [`i-btn-${size}`]: size !== "normal",
        round,
        disabled,
    });

const Button = (props: TypeButton): JSX.Element => {
    const {
        tag = "a",
        children,
        className,
        loading,
        flat,
        size,
        href,
        Link,
        ...rest
    } = props;

    if (Link) {
        return (
            <Link to={href} className={formatClass(props)} {...rest}>
                {loading && <span className="i-loading-icon"></span>}
                <span className="i-btn-content">{children}</span>
            </Link>
        );
    }

    const Component = href ? "a" : tag;

    return (
        <Component href={href} className={formatClass(props)} {...rest}>
            {loading && <span className="i-loading-icon"></span>}
            <span className="i-btn-content">{children}</span>
        </Component>
    );
};

export default Button;
