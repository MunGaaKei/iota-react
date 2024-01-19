import classNames from "classnames";
import { forwardRef } from "react";
import { createPortal } from "react-dom";
import { IPopupContent } from "./type";

const Content = forwardRef<HTMLDivElement, IPopupContent>((props, ref) => {
	const {
		getContainer = () => document.body,
		arrow,
		arrowStyle,
		className,
		children,
		...restProps
	} = props;

	const content = (
		<div
			ref={ref}
			className={classNames("i-popup", className)}
			{...restProps}
		>
			{arrow && <i className='i-popup-arrow' style={arrowStyle} />}

			{children}
		</div>
	);

	return createPortal(content, getContainer());
});

export default Content;
