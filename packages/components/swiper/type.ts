import { BaseElement } from "@p/type";
import { ForwardRefExoticComponent, ReactNode } from "react";

export interface Props extends BaseElement {
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
	autoplay?: boolean;
	pauseOnHover?: boolean;
	indicator?: boolean;
	itemHeight?: number;
	vertical?: boolean;
	prev?: ReactNode;
	next?: ReactNode;
	renderIndicator?: (i: number) => ReactNode;
	onInitial?: () => void;
	onBeforeSwipe?: (before?: number) => void;
	onAfterSwipe?: (after?: number) => void;
}

export interface IItem
	extends BaseElement,
		Pick<Props, "gap" | "itemHeight" | "vertical" | "type"> {
	active?: boolean;
	index?: number;
	transition?: string;
}

export interface ISwiper {
	swipeTo: (i: number) => void;
	swipeNext: () => void;
	swipePrev: () => void;
}

export interface ISwiperRef extends ForwardRefExoticComponent<any> {
	Item: (props: IItem) => ReactNode;
}
