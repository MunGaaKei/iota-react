import { useMouseMove, useMouseUp } from "@p/js/hooks";
import {
	KeyboardArrowLeftRound,
	KeyboardArrowRightRound,
} from "@ricons/material";
import { useReactive } from "ahooks";
import classNames from "classnames";
import { Children, MouseEvent, useCallback, useMemo, useRef } from "react";
import Icon from "../icon";
import "./index.scss";
import Item from "./item";
import { Props } from "./type";

const Swiper = (props: Props): JSX.Element => {
	const {
		type = "normal",
		initial = 0,
		display = 1,
		scroll = 1,
		loop = true,
		vertical,
		prev = <Icon icon={<KeyboardArrowLeftRound />} size='2em' />,
		next = <Icon icon={<KeyboardArrowRightRound />} size='2em' />,
		duration = 600,
		interval = 3000,
		draggable = true,
		dragOffset = 40,
		gap = 0,
		itemHeight,
		style,
		className,
		children,
		onBeforeSwipe,
		onAfterSwipe,
		onInitial,
	} = props;

	const $list = useRef<HTMLDivElement>(null);
	const transition = `all ${duration / 1000}s`;
	const state = useReactive({
		current: initial,
		swipable: true,
		transition: type === "fade" ? "none" : transition,
		dragStart: 0,
		dragging: false,
		initialized: false,
	});

	const items = useMemo(() => {
		return Children.map(children, (node: any) => {
			if (node.type?.iotaname !== "SwiperItem") return;

			return node;
		});
	}, [children]);

	const [displayItems, extra, size, total, listSize] = useMemo(() => {
		const extra =
			type === "normal" && loop && items.length > display
				? display + 1
				: 0;
		let list: any = [];

		if (extra <= 0) {
			list = [...items];
		} else {
			const head = items.slice(0, extra);
			const tail = items.slice(-extra);
			list = [...tail, ...items, ...head];
		}

		const listSize = `${(list.length / display) * 100}%`;

		return [list, extra, items.length, list.length, listSize];
	}, [display, loop, type, items]);

	const offsetPercent = useMemo(
		() => (-100 * (state.current + extra)) / total,
		[state.current, total]
	);

	const position = useMemo(() => {
		if (size <= display || type === "fade") return;

		const offset = vertical
			? `0, ${offsetPercent}%`
			: `${offsetPercent}%, 0`;
		return `translate3d(${offset}, 0)`;
	}, [offsetPercent, vertical, display, size, type]);

	const trackStyle = useMemo(() => {
		if (!vertical || !itemHeight) return;

		return {
			height: itemHeight * display,
		};
	}, [vertical, itemHeight, display]);

	const swipeTo = useCallback(
		(i: number) => {
			if (!state.swipable || i === state.current) return;
			state.swipable = false;
			onBeforeSwipe?.(state.current);

			let reset = false;
			let next = i;

			if (loop && (i >= size || i < 0)) {
				reset = true;
				next = (i + size) % size;
			}

			setTimeout(() => {
				state.swipable = true;
			}, duration + 32);

			if (type === "fade") {
				state.current = next;
				onAfterSwipe?.(next);
				return;
			}

			state.current = i;

			if (!reset) return;

			setTimeout(() => {
				state.transition = "none";
				state.current = next;
				onAfterSwipe?.(next);
				setTimeout(() => {
					state.transition = transition;
				}, 16);
			}, duration + 12);
		},
		[duration]
	);

	const swipeNext = () => {
		let next = state.current + scroll;

		if (!loop && next > size - display) next = size - display;

		swipeTo(next);
	};

	const swipePrev = () => {
		let prev = state.current - scroll;

		if (!loop && prev < 0) prev = 0;

		swipeTo(prev);
	};

	const handleMouseDown = useCallback(
		(e: MouseEvent) => {
			if (!draggable || !state.swipable) return;
			e.stopPropagation();

			Object.assign(state, {
				dragStart: vertical ? e.clientY : e.clientX,
				dragging: true,
				transition: "none",
			});
		},
		[draggable, vertical]
	);

	const handleMouseMove = useCallback(
		(e: any) => {
			if (!state.dragging || !$list.current) return;
			e.preventDefault();

			const dragEnd = vertical ? e.clientY : e.clientX;
			const offset =
				((dragEnd - state.dragStart) * 61.8) /
					$list.current[vertical ? "offsetHeight" : "offsetWidth"] +
				offsetPercent;

			$list.current.style.transform = `translate3d(${
				vertical ? `0, ${offset}%` : `${offset}%, 0`
			}, 0)`;
		},
		[vertical, $list.current, offsetPercent]
	);

	const handleMouseUp = useCallback(
		(e: any) => {
			if (!state.dragging || !$list.current) return;

			const dragEnd = vertical ? e.clientY : e.clientX;
			const part =
				$list.current[vertical ? "offsetHeight" : "offsetWidth"] /
				total;
			const offset = (dragEnd - state.dragStart) * 0.618;
			const absOffset = Math.abs(offset);

			if (absOffset > dragOffset) {
				const base = Math.floor(absOffset / part);
				const mod = (absOffset % part) - dragOffset > 0 ? 1 : 0;
				const p = base + mod;

				const to = state.current + (offset > 0 ? -p : p);

				swipeTo(to);
			} else {
				$list.current.style.transform = position || "";
			}

			Object.assign(state, {
				dragging: false,
				transition,
			});
		},
		[vertical, $list.current, offsetPercent]
	);

	useMouseMove(handleMouseMove);
	useMouseUp(handleMouseUp);

	return (
		<div
			style={style}
			className={classNames(
				"i-swiper",
				{
					"i-swiper-vertical": vertical,
					"i-swiper-initialized": state.initialized,
				},
				className
			)}
		>
			<div className='i-swiper-track' style={trackStyle}>
				<div
					ref={$list}
					className={classNames("i-swiper-list", {
						"i-swiper-fade": type === "fade",
					})}
					style={{
						[vertical ? "height" : "width"]: listSize,
						transform: position,
						transition: state.transition,
					}}
					onMouseDown={handleMouseDown}
				>
					{displayItems.map((item, i) => {
						const { props: itemProps } = item;

						return (
							<Item
								key={i}
								index={i}
								active={i - extra === state.current}
								type={type}
								gap={gap}
								transition={transition}
								itemHeight={itemHeight}
								vertical={vertical}
								{...itemProps}
							/>
						);
					})}
				</div>

				<a className='i-swiper-arrow i-swiper-prev' onClick={swipePrev}>
					{prev}
				</a>
				<a className='i-swiper-arrow i-swiper-next' onClick={swipeNext}>
					{next}
				</a>
			</div>
		</div>
	);
};

Swiper.Item = Item;

export default Swiper;