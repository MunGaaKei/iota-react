import classNames from "classnames";
import "./index.scss";
import type { Props } from "./type";

const Badge = (props: Props): JSX.Element => {
	const {
		visible = true,
		content,
		contentClass,
		dot,
		dotSize,
		style,
		className,
		children,
	} = props;

	return (
		<div style={style} className={classNames("i-badge", className)}>
			{children}

			<div
				className={classNames("i-badge-content", contentClass, {
					"i-badge-dot": dot,
					"i-badge-hidden": !visible,
				})}
				style={{ fontSize: dotSize }}
			>
				{content}
			</div>
		</div>
	);
};

export default Badge;
