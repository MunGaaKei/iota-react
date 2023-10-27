import classnames from "classnames";
import { createElement } from "react";
import "./index.scss";
import { Props } from "./type";

const formatClass = ({
	outline,
	flat,
	loading,
	disabled,
	size = "normal",
	block,
	round,
	square,
	className,
}: Props) =>
	classnames("i-btn", className, {
		"i-btn-outline": outline,
		"i-btn-flat": flat,
		"i-btn-block": block,
		"i-btn-loading": loading,
		"i-btn-square": square,
		[`i-btn-${size}`]: size !== "normal",
		round,
		disabled,
	});

const Button = (props: Props) => {
	const {
		as = "a",
		children,
		className,
		loading,
		flat,
		outline,
		square,
		size,
		href,
		...rest
	} = props;

	const As = as ?? "a";

	const childNodes = [
		loading &&
			createElement("span", {
				key: "loading",
				className: "i-loading-icon",
			}),
		createElement(
			"span",
			{ key: "content", className: "i-btn-content" },
			children
		),
	];

	if (typeof As === "string") {
		return createElement(
			As,
			{
				href,
				className: formatClass(props),
				...rest,
			},
			childNodes
		);
	}

	return createElement(
		As,
		{
			to: href || "",
			className: formatClass(props),
			...rest,
		},
		childNodes
	);
};

export default Button;
