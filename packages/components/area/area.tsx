import classNames from "classnames";
import { CSSProperties, forwardRef } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import "./area.css";
import Item from "./item";
import { CompositionArea, IArea } from "./type";

const Area = forwardRef<Scrollbars, IArea>((props, ref): JSX.Element => {
	const { contentWidth, style, className, children, ...restProps } = props;

	return (
		<Scrollbars
			ref={ref}
			autoHide
			style={
				{
					["--content-width"]: contentWidth,
					...style,
				} as CSSProperties
			}
			className={classNames("i-area", className)}
			renderView={(viewProps) => (
				<div className='i-area-scroller' {...viewProps} />
			)}
			{...restProps}
		>
			{children}
		</Scrollbars>
	);
}) as CompositionArea;

Area.Item = Item;

export default Area;
