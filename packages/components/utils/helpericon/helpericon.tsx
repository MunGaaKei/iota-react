import { CloseRound } from "@ricons/material";
import classNames from "classnames";
import Icon from "../../icon";
import "./index.scss";
import { IHelperIcon } from "./type";

const Helpericon = (props: IHelperIcon): JSX.Element => {
	const {
		active,
		style,
		className,
		icon = <CloseRound />,
		...restProps
	} = props;

	if (!active) return <></>;

	return (
		<a
			className={classNames("i-helpericon", className)}
			style={style}
			{...restProps}
		>
			<Icon icon={icon} />
		</a>
	);
};

export default Helpericon;
