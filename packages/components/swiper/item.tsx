import classNames from "classnames";
import { useMemo } from "react";
import { IItem } from "./type";

function Item(props: IItem) {
	const {
		index = 0,
		active,
		type,
		transition,
		gap = 0,
		itemHeight,
		vertical,
		style,
		className,
		children,
	} = props;

	const selfStyle = useMemo(() => {
		if (type === "normal") {
			return {
				[vertical ? "paddingBlock" : "paddingInline"]: gap / 2,
				height: itemHeight,
			};
		}

		return {
			transform: `translate(-${index * 100}%, 0)`,
			transition,
		};
	}, [index, gap, itemHeight, vertical, type]);

	return (
		<div
			style={{ ...style, ...selfStyle }}
			className={classNames("i-swiper-item", className, {
				"i-swiper-active": active,
			})}
			data-index={index}
		>
			{children}
		</div>
	);
}

Item.iotaname = "SwiperItem";

export default Item;
