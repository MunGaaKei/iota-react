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
import Popup from "../popup";
import "./index.css";
import TabItem from "./item";
import { CompositionTabs, ITabItem, ITabs, RefTabs, TTabKey } from "./type";

type TState = {
	active?: TTabKey;
	barStyle: CSSProperties;
	cachedTabs: TTabKey[];
	overflow: boolean;
	more: ITabItem[];
};

const Tabs = forwardRef<RefTabs, ITabs>((props, ref) => {
	const {
		active,
		tabs: items,
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
		cachedTabs: [],
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
				const { title, children, content, keepDOM } = nodeProps;

				return {
					key: key || String(i),
					title,
					content: children || content,
					keepDOM,
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

			state.barStyle = {
				height: 0,
				width: 0,
			};
			return;
		}

		onTabChange?.(key, state.active);
		state.active = key;
	}, []);

	const handleMouseWheel = (e: WheelEvent) => {
		e.stopPropagation();
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
		if (!bar || state.active === undefined) {
			return;
		}

		const index = tabs.findIndex((tab) => tab.key === state.active);
		const nav = navRefs.current[index];

		if (!nav) return;

		if (tabs[index].keepDOM && state.active) {
			const i = state.cachedTabs.findIndex((k) => k === state.active);
			i < 0 && state.cachedTabs.unshift(state.active);
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
		if (active === undefined || state.active === active) return;

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
					onWheelCapture={handleMouseWheel}
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
						hideDelay={500}
						content={
							<div className='i-tabs-morelist pd-4'>
								{state.more.map((tab, i) => {
									const { key = i, title } = tab;

									return (
										<a
											key={key}
											className={classNames("i-tab-nav", {
												"i-tab-active":
													state.active === key,
											})}
											onClick={() => open(key)}
										>
											{title}
										</a>
									);
								})}
							</div>
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
						(key !== undefined && state.cachedTabs.includes(key));

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
