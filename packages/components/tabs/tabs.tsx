import { useIntersectionObserver, useResizeObserver } from "@p/js/hooks";
import { MoreHorizRound } from "@ricons/material";
import { useReactive } from "ahooks";
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
import "./index.scss";
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
		prepend,
		append,
		children,
		className,
		vertical,
		toggable,
		maxCache = 13,
		bar = true,
		barStyle = {},
		onTabChange,
		...rest
	} = props;

	const navRefs = useRef<HTMLElement[]>([]);
	const barRef = useRef<HTMLSpanElement>(null);
	const navsRef = useRef<HTMLDivElement>(null);
	const state = useReactive<TState>({
		active,
		barStyle,
		cache: [],
		overflow: false,
		more: [],
	});
	const { observe: IOobserve, unobserve: IOunobserve } =
		useIntersectionObserver();
	const { observe: ROobserve, unobserve: ROunobserve } = useResizeObserver();

	const tabs: ITabItem[] = useMemo(() => {
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

	const watchOverflow = useCallback(() => {
		if (!navRefs.current || !navsRef.current) return;

		const { scrollHeight, scrollWidth, offsetWidth, offsetHeight } =
			navsRef.current as HTMLElement;

		state.overflow =
			scrollHeight > offsetHeight || scrollWidth > offsetWidth;

		if (!state.overflow) return;

		navRefs.current?.map((nav, i) => {
			IOobserve(nav, (tar: HTMLElement, visible: boolean) => {
				tabs[i].intersecting = visible;
				state.more = tabs.filter((tab) => !tab.intersecting);
			});
		});
	}, [navRefs.current]);

	useEffect(() => {
		if (!bar) return;

		const index = tabs.findIndex((tab) => tab.key === state.active);
		const nav = navRefs.current[index];

		if (!nav) return;

		if (tabs[index].keepalive && state.active) {
			const i = state.cache.findIndex((k) => k === state.active);
			i < 0 && state.cache.unshift(state.active);

			if (state.cache.length > maxCache) {
				state.cache.length = maxCache;
			}
		}

		const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = nav;

		state.barStyle = {
			height: offsetHeight,
			width: offsetWidth,
			transform: `translate(${offsetLeft}px, ${offsetTop}px)`,
			...barStyle,
		};
	}, [state.active, bar]);

	useEffect(() => {
		if (!active) return;

		open(active);
	}, [active]);

	useEffect(() => {
		watchOverflow();
		navsRef.current && ROobserve(navsRef.current, watchOverflow);

		return () => {
			navRefs.current?.map(IOunobserve);
			ROunobserve(navsRef.current as HTMLElement);
		};
	}, [tabs]);

	useImperativeHandle(ref, () => ({
		open,
		close,
	}));

	return (
		<div
			className={classNames("i-tabs", { flex: vertical }, className)}
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
							className='i-tab-navs-bar'
							style={state.barStyle}
						/>
					)}
				</div>

				{state.overflow && state.more.length > 0 && (
					<Popup
						arrow={false}
						position={vertical ? "right" : "bottom"}
						align='end'
						trigger='click'
						watchResize
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
						<Button flat square size='small'>
							<Icon icon={<MoreHorizRound />} />
						</Button>
					</Popup>
				)}

				{append}
			</div>

			<div className='i-tab-contents'>
				{tabs.map((tab) => {
					const { key, content } = tab;
					const isActive = state.active === key;
					const show = isActive || (key && state.cache.includes(key));

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
