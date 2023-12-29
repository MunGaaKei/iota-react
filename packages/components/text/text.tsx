import classNames from "classnames";
import { useMemo } from "react";
import "./index.scss";
import { Props } from "./type";

const Text = (props: Props): JSX.Element => {
	const {
		as: Tag = "span",
		size,
		weight,
		decoration,
		gradient,
		style,
		className,
		children,
	} = props;

	const gradients = useMemo(() => {
		if (!gradient || !Array.isArray(gradient)) return {};

		return {
			WebkitBackgroundClip: "text",
			background: `-webkit-linear-gradient(${gradient.join(",")})`,
		};
	}, [gradient]);

	return (
		<Tag
			style={{
				fontSize: size,
				fontWeight: weight,
				textDecoration: decoration,
				...gradients,
				...style,
			}}
			className={classNames(className, {
				"i-text-gradient": gradient,
			})}
		>
			{children}
		</Tag>
	);
};

export default Text;
