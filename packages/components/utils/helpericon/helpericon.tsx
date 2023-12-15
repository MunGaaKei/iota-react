import { CloseRound } from "@ricons/material";
import classNames from "classnames";
import Icon from "../../icon";
import "./index.scss";
import { Props } from "./type";

const Helpericon = (props: Props): JSX.Element => {
	const { active, className, icon = <CloseRound />, onClick } = props;

	if (!active) return <></>;

	return (
		<a className={classNames("i-helpericon", className)} onClick={onClick}>
			<Icon icon={icon} />
		</a>
	);
};

export default Helpericon;
