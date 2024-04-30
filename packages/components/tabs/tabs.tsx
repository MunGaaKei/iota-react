import { useIntersectionObserver } from "@p/js/hooks";
import { MoreHorizRound } from "@ricons/material";
import { useReactive, useSize } from "ahooks";
import classNames from "classnames";
import {
	CSSProperties,
	Children,
	WheelEvent,
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
} from "react";
import Button from "../button";
import Icon from "../icon";
import List from "../list";
import Popup from "../popup";
import "./index.css";
import TabItem from "./item";
import { CompositionTabs, ITabItem, ITabs, RefTabs, TTabKey } from "./type";

type TState = {
	active?: TTabKey;
	barStyle: CSSProperties;
	cache: TTabKey[];
	overflow: boolean;
	more: ITabItem[];
};

const Tabs = forwardRef<RefTabs, ITabs>((props, ref) => {
	const {
		active,
		items,
		type = "default",
		prepend,
		append,
		children,
		className,
		vertical,
		toggable,
		bar = true,
		hideMore,
		barClass,
		renderMore = () => (
			<Button flat square size='small'>
				<Icon icon={<MoreHorizRound />} />
			</Button>
		),
		onTabChange,
		...rest
	} = props;

	const navRefs = useRef<HTMLElement[]>([]);
	const barRef = useRef<HTMLSpanElement>(null);
	const navsRef = useRef<HTMLDivElement>(null);
	const state = useReactive<TState>({
		active,
		barStyle: {},
		cache: [],
		overflow: false,
		more: [],
	});
	const { observe, unobserve } = useIntersectionObserver();
	const size = useSize(navsRef);

	const tabs: ITabItem[] = useMemo(() => {
		if (!items) {
			if (!children) return [];

			return Children.map(children, (node, i) => {
				const { key, props: nodeProps } = node as {
					key?: TTabKey;
					props?: any;
				};
				const { title, children, content, keepalive } = nodeProps;

				return {
					key: key || String(i),
					title,
					content: children || content,
					keepalive,
				};
			}) as ITabItem[];
		}

		items.map((item, i) => {
			if (item.key !== undefined) return;
			item.key = i;
		});

		return items;
	}, [children]);

	const open = useCallback((key: TTabKey) => {
		if (key === state.active) {
			if (!toggable) return;

			onTabChange?.(undefined, key);
			state.active = undefined;
			return;
		}

		onTabChange?.(key, state.active);
		state.active = key;
	}, []);

	const handleMouseWheel = (e: WheelEvent) => {
		if (vertical) return;

		navsRef.current?.scrollBy({
			left: e.deltaY + e.deltaX,
		});
	};

	useEffect(() => {
		if (!size || hideMore) return;
		const { scrollHeight, scrollWidth } = navsRef.current as HTMLElement;
		const { width, height } = size;

		state.overflow = scrollHeight > height || scrollWidth > width;

		if (!state.overflow) return;

		navRefs.current.map((nav, i) => {
			observe(nav, (tar: HTMLElement, visible: boolean) => {
				tabs[i].intersecting = visible;
				state.more = tabs.filter((tab) => !tab.intersecting);
			});
		});
	}, [size, hideMore]);

	useEffect(() => {
		if (!bar || state.active === undefined) return;

		const index = tabs.findIndex((tab) => tab.key === state.active);
		const nav = navRefs.current[index];

		if (!nav) return;

		if (tabs[index].keepalive && state.active) {
			const i = state.cache.findIndex((k) => k === state.active);
			i < 0 && state.cache.unshift(state.active);
		}

		const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = nav;
		const isLine = type === "line";

		state.barStyle = {
			height: !vertical && isLine ? ".25em" : offsetHeight,
			width: vertical && isLine ? ".25em" : offsetWidth,
			transform: `translate(${offsetLeft}px, ${offsetTop}px)`,
		};
	}, [state.active, bar]);

	useEffect(() => {
		if (active === undefined) return;

		open(active);
	}, [active]);

	useEffect(() => {
		return () => {
			navRefs.current?.map(unobserve);
		};
	}, [tabs]);

	useImperativeHandle(ref, () => ({
		open,
		close,
		navs: navsRef,
	}));

	return (
		<div
			className={classNames(
				"i-tabs",
				{ flex: vertical, [`i-tabs-${type}`]: type !== "default" },
				className
			)}
			{...rest}
		>
			<div
				className={classNames("i-tab-navs-container", {
					"flex-column": vertical,
				})}
			>
				{prepend}

				<div
					ref={navsRef}
					className='i-tab-navs'
					onWheel={handleMouseWheel}
				>
					{tabs.map((tab, i) => {
						const { title, key = i } = tab;

						return (
							<a
								key={key}
								ref={(ref) =>
									(navRefs.current[i] =
										ref as HTMLAnchorElement)
								}
								className={classNames("i-tab-nav", {
									"i-tab-active": state.active === key,
								})}
								onClick={() => open(key)}
							>
								{title}
							</a>
						);
					})}

					{bar && (
						<span
							ref={barRef}
							className={classNames("i-tab-navs-bar", barClass)}
							style={state.barStyle}
						/>
					)}
				</div>

				{!hideMore && state.overflow && state.more.length > 0 && (
					<Popup
						arrow={false}
						position={vertical ? "right" : "bottom"}
						align='end'
						touchable
						content={
							<List className='pd-4'>
								{state.more.map((tab, i) => {
									const { key = i, title } = tab;

									return (
										<List.Item
											key={key}
											type='option'
											className={classNames("i-tab-nav", {
												"i-tab-active":
													state.active === key,
											})}
											onClick={() => open(key)}
										>
											{title}
										</List.Item>
									);
								})}
							</List>
						}
					>
						{renderMore(state.more)}
					</Popup>
				)}

				{append}
			</div>

			<div className='i-tab-contents'>
				{tabs.map((tab, i) => {
					const { key = i, content } = tab;
					const isActive = state.active === key;
					const show =
						isActive ||
						(key !== undefined && state.cache.includes(key));

					return (
						show && (
							<div
								key={key}
								className={classNames("i-tab-content", {
									"i-tab-active": isActive,
								})}
							>
								{content}
							</div>
						)
					);
				})}
			</div>
		</div>
	);
}) as CompositionTabs;

Tabs.Item = TabItem;

export default Tabs;
