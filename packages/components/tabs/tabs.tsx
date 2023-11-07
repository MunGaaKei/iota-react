import classNames from "classnames";
import { Children, useEffect, useMemo, useRef, useState } from "react";
import "./index.scss";
import TabItem from "./item";
import { ITab, Props } from "./type";

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
	const [barStyle, setBarStyle] = useState({});

	const tabs: ITab[] = useMemo(() => {
		return Children.map(children, (node, i) => {
			const { key, props: nodeProps } = node as {
				key?: string | number;
				props?: any;
			};
			const { title, children } = nodeProps;

			return {
				key: key || i,
				title,
				content: children,
			};
		}) as ITab[];
	}, [children]);

	const handleNavClick = (key?: string | number) => {
		if (key === activeKey) return;

		setActiveKey((prev) => {
			onTabChange?.(key, prev);
			return key;
		});
	};

	useEffect(() => {
		const index = tabs.findIndex((tab) => tab.key === activeKey);
		const nav = navRefs.current[index];

		if (!nav) return;

		const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = nav;

		setBarStyle({
			top: vertical ? offsetTop : ".8em",
			height: vertical ? offsetHeight : "1em",
			left: vertical ? ".8em" : offsetLeft,
			width: vertical ? "1em" : offsetWidth,
		});
	}, [activeKey]);

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

				<div className='i-tab-navs'>
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
