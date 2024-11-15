import { BaseElement } from "@p/type";
import { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import Item from "./item";

export interface ISwiper extends BaseElement {
	initial?: number;
	type?: "normal" | "fade" | "flow";
	display?: number;
	scroll?: number;
	loop?: boolean;
	gap?: number;
	duration?: number;
	interval?: number;
	draggable?: boolean;
	dragOffset?: number;
	reverse?: boolean;
	autoplay?: boolean;
	pauseOnHover?: boolean;
	indicator?: boolean;
	itemHeight?: number;
	vertical?: boolean;
	prev?: ReactNode;
	next?: ReactNode;
	arrow?: boolean;
	renderIndicator?: (i: number) => ReactNode;
	onBeforeSwipe?: (before: number) => void;
	onAfterSwipe?: (after: number) => void;
}

export interface ISwiperItem
	extends BaseElement,
		Pick<ISwiper, "gap" | "itemHeight" | "vertical" | "type"> {
	active?: boolean;
	index?: number;
	transition?: string;
}

export interface RefSwiper {
	swipeTo: (i: number) => void;
	swipeNext: () => void;
	swipePrev: () => void;
}

export interface CompositionSwiper
	extends ForwardRefExoticComponent<ISwiper & RefAttributes<RefSwiper>> {
	Item: typeof Item;
}
