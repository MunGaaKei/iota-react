import { SkipPreviousRound } from "@ricons/material";
import classNames from "classnames";
import Button from "../button";
import Icon from "../icon";
import { IToTop } from "./type";

function ToTop(props: IToTop) {
	const { style, className, onClick } = props;

	return (
		<Button
			square
			className={classNames("i-affix-totop", className)}
			style={{ ...style }}
			onClick={onClick}
		>
			<Icon icon={<SkipPreviousRound />} rotate={90} />
		</Button>
	);
}

ToTop.iotaname = "AffixToTop";

export default ToTop;