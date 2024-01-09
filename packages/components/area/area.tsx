import classNames from "classnames";
import { forwardRef } from "react";
import "./area.scss";
import Item from "./item";
import { IArea, Props } from "./type";

const Area = forwardRef<HTMLDivElement, Props>((props, ref): JSX.Element => {
	const { layout = "naruto", gap, style, className, children } = props;

	return (
		<div
			ref={ref}
			style={{ gap, ...style }}
			className={classNames("i-area", `i-area-${layout}`, className)}
		>
			{children}
		</div>
	);
}) as IArea;

Area.Item = Item;

export default Area;
