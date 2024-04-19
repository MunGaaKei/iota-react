import classNames from "classnames";
import { useMemo } from "react";
import Highlight from "./highlight";
import "./index.css";
import Number from "./number";
import Time from "./time";
import { IText } from "./type";

const Text = (props: IText): JSX.Element => {
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
			background: `-webkit-linear-gradient(${gradient.join(",")})`,
			backgroundClip: "text",
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

Text.Highlight = Highlight;
Text.Number = Number;
Text.Time = Time;

export default Text;
