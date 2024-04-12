import useRipple from "@p/js/useRipple";
import classnames from "classnames";
import { createElement, forwardRef } from "react";
import Loading from "../loading";
import "./index.scss";
import Toggle from "./toggle";
import { CompositionButton, IButton } from "./type";

const formatClass = ({
	outline,
	flat,
	loading,
	disabled,
	size = "normal",
	block,
	round,
	square,
	secondary,
	className,
}: IButton) =>
	classnames("i-btn", className, {
		"i-btn-outline": outline,
		"i-btn-flat": flat,
		"i-btn-block": block,
		"i-btn-loading": loading,
		"i-btn-square": square,
		"i-btn-secondary": secondary,
		[`i-btn-${size}`]: size !== "normal",
		round,
		disabled,
	});

const Button = forwardRef<HTMLElement, IButton>((props, ref) => {
	const {
		as: As = "a",
		children,
		className,
		loading,
		flat,
		outline,
		square,
		secondary,
		size,
		href,
		ripple = true,
		...restProps
	} = props;

	if (!children) return <></>;

	ripple && useRipple();

	const childNodes = [
		loading && <Loading key='loading' />,
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
				...restProps,
			},
			childNodes
		);
	}

	return createElement(
		As,
		{
			to: href || "",
			...attrs,
			...restProps,
		},
		childNodes
	);
}) as CompositionButton;

Button.Toggle = Toggle;

export default Button;
