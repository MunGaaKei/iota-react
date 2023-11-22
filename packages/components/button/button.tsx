import useRipple from "@p/js/useRipple";
import classnames from "classnames";
import { createElement, forwardRef } from "react";
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

const Button = forwardRef<HTMLElement, Props>((props, ref) => {
	const {
		as: As = "a",
		children,
		className,
		loading,
		flat,
		outline,
		square,
		size,
		href,
		ripple = true,
		...rest
	} = props;

	ripple && useRipple();

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

	const attrs = {
		className: formatClass(props),
		["data-ripple"]: ripple,
	};

	if (typeof As === "string") {
		return createElement(
			As,
			{
				ref,
				href,
				...attrs,
				...rest,
			},
			childNodes
		);
	}

	return createElement(
		As,
		{
			to: href || "",
			...attrs,
			...rest,
		},
		childNodes
	);
});

export default Button;
