import classNames from "classnames";
import {
	Children,
	WheelEvent,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import "./index.scss";
import TabItem from "./item";
import { ITab, Props, TabKey } from "./type";

function Tabs(props: Props) {
	const {
		active,
		prepend,
		append,
		children,
		className,
		vertical,
		lazyload,
		bar = true,
		onTabChange,
		...rest
	} = props;

	const [activeKey, setActiveKey] = useState(active);
	const navRefs = useRef<HTMLAnchorElement[]>([]);
	const barRef = useRef<HTMLSpanElement>(null);
	const navsRef = useRef<HTMLDivElement>(null);
	const [barStyle, setBarStyle] = useState({});

	const tabs: ITab[] = useMemo(() => {
		return Children.map(children, (node, i) => {
			const { key, props: nodeProps } = node as {
				key?: TabKey;
				props?: any;
			};
			const { title, children, content } = nodeProps;

			return {
				key: key || i,
				title,
				content: children || content,
			};
		}) as ITab[];
	}, [children]);

	const handleNavClick = (key?: TabKey) => {
		if (key === activeKey) return;

		setActiveKey((prev) => {
			onTabChange?.(key, prev);
			return key;
		});
	};

	const handleMouseWheel = (e: WheelEvent) => {
		if (vertical) return;

		navsRef.current?.scrollBy({
			left: e.deltaY + e.deltaX,
		});
	};

	useEffect(() => {
		if (!bar) return;

		const index = tabs.findIndex((tab) => tab.key === activeKey);
		const nav = navRefs.current[index];

		if (!nav) return;

		const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = nav;

		setBarStyle({
			height: offsetHeight,
			width: offsetWidth,
			transform: `translate(${offsetLeft}px, ${offsetTop}px)`,
		});
	}, [activeKey, bar]);

	useEffect(() => {
		setActiveKey((prev) => {
			onTabChange?.(active, prev);
			return active;
		});
	}, [active]);

	return (
		<div className={classNames("i-tab", className)} {...rest}>
			<div className='i-tab-navs-container'>
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
									"i-tab-active": activeKey === key,
								})}
								onClick={() => handleNavClick(key)}
							>
								{title}
							</a>
						);
					})}

					{bar && (
						<span
							ref={barRef}
							className='i-tab-navs-bar'
							style={barStyle}
						></span>
					)}
				</div>

				{append}
			</div>

			<div className='i-tab-contents'>
				{tabs.map((tab) => {
					const { key, content } = tab;
					const isActive = activeKey === key;

					return (
						(isActive || !lazyload) && (
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
}

Tabs.Item = TabItem;

export default Tabs;
