import { CheckRound } from "@ricons/material";
import classNames from "classnames";
import Divider from "./divider";
import { IStepItem } from "./type";

const STATUS = ["finished", "active", "pending"];

function renderIcon(i: number, status: string) {
	return (
		<span className='i-step-item-index'>
			{status === "finished" ? (
				<CheckRound style={{ width: "1em", height: "1.5em" }} />
			) : (
				i + 1
			)}
		</span>
	);
}

function Item(props: IStepItem) {
	const {
		index = 0,
		active = 0,
		icon = renderIcon,
		title,
		vertical,
		divider = <Divider />,
		style,
		className,
		children,
		onClick,
	} = props;
	const status = STATUS[index === active ? 1 : index < active ? 0 : 2];

	const handleClick = () => {
		onClick?.(index);
	};

	return (
		<div
			style={style}
			className={classNames(
				"i-step-item",
				`i-step-item-${status}`,
				className
			)}
			onClick={handleClick}
		>
			{vertical ? (
				<>
					<div className='i-step-item-left'>
						{icon?.(index, status)}
						{divider}
					</div>
					<div className='i-step-item-right'>
						<div className='i-step-item-title'>{title}</div>
						{children && (
							<div className='i-step-item-content'>
								{children}
							</div>
						)}
					</div>
				</>
			) : (
				<>
					<div className='i-step-item-title'>
						{icon?.(index, status)}

						<span>{title}</span>

						{divider}
					</div>
					{children && (
						<div className='i-step-item-content'>{children}</div>
					)}
				</>
			)}
		</div>
	);
}

export default Item;
