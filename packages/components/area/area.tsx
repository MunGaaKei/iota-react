import classNames from "classnames";
import { CSSProperties, forwardRef } from "react";
import "./area.css";
import Item from "./item";
import { CompositionArea, IArea } from "./type";

const Area = forwardRef<HTMLDivElement, IArea>((props, ref): JSX.Element => {
	const {
		layout = "naruto",
		configs = {},
		style,
		className,
		children,
	} = props;

	const { headerHeight, contentWidth, gap } = configs;

	return (
		<div
			ref={ref}
			style={
				{
					["--header-height"]: headerHeight,
					["--content-width"]: contentWidth,
					gap,
					...style,
				} as CSSProperties
			}
			className={classNames("i-area", `i-area-${layout}`, className)}
		>
			{children}
		</div>
	);
}) as CompositionArea;

Area.Item = Item;

export default Area;
