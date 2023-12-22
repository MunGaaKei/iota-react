import classNames from "classnames";
import "./index.scss";
import { Props } from "./type";

const Text = (props: Props): JSX.Element => {
	const {
		as: Tag = "span",
		size,
		weight,
		decoration,
		style,
		className,
		children,
	} = props;

	return (
		<Tag
			style={{
				fontSize: size,
				fontWeight: weight,
				textDecoration: decoration,
				...style,
			}}
			className={classNames(className)}
		>
			{children}
		</Tag>
	);
};

export default Text;
