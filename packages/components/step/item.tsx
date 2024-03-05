import { CheckCircleRound } from "@ricons/material";
import classNames from "classnames";
import Divider from "./divider";
import { IStepItem } from "./type";

const STATUS = ["finished", "active", "pending"];

function renderIcon(i: number, status: string) {
	if (status === "finished")
		return <CheckCircleRound style={{ width: "1.2em" }} />;

	return <></>;
}

function Item(props: IStepItem) {
	const {
		index = 0,
		active = 0,
		icon = renderIcon,
		title,
		divider = <Divider />,
		style,
		className,
		children,
	} = props;
	const status = STATUS[index === active ? 1 : index < active ? 0 : 2];

	return (
		<div
			style={style}
			className={classNames(
				"i-step-item",
				`i-step-item-${status}`,
				className
			)}
		>
			<div className='i-step-item-title'>
				{icon?.(index, status)}

				<span>{title}</span>

				{divider}
			</div>
			{children && <div className='i-step-item-content'>{children}</div>}
		</div>
	);
}

export default Item;
