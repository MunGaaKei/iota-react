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
import "./index.scss";
import TabItem from "./item";
import { ITab, ITabs, Props } from "./type";

const Tabs = forwardRef<ITabs, Props>((props, ref) => {
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
		onTabChange,
		...rest
	} = props;

	const navRefs = useRef<HTMLAnchorElement[]>([]);
	const barRef = useRef<HTMLSpanElement>(null);
	const navsRef = useRef<HTMLDivElement>(null);
	const state = useReactive<{
		active?: string;
		barStyle: CSSProperties;
		cache: string[];
	}>({
		active,
		barStyle: {},
		cache: [],
	});

	const tabs: ITab[] = useMemo(
		() =>
			Children.map(children, (node, i) => {
				const { key, props: nodeProps } = node as {
					key?: string;
					props?: any;
				};
				const { title, children, content, keepalive } = nodeProps;

				return {
					key: key || String(i),
					title,
					content: children || content,
					keepalive,
				};
			}) as ITab[],
		[children]
	);

	const open = useCallback((key?: string) => {
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
		};
	}, [state.active, bar]);

	useEffect(() => {
		open(active);
	}, [active]);

	useImperativeHandle(ref, () => ({
		open,
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
						const { title, key } = tab;

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
}) as any;

Tabs.Item = TabItem;

export default Tabs;
