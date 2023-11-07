import classNames from "classnames";
import {
	Children,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import "./index.scss";
import { Props } from "./type";

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
		...rest
	} = props;

	const [activeKey, setActiveKey] = useState(active);
	const navRefs = useRef([]);
	const barRef = useRef();
	const [barStyle, setBarStyle] = useState({});

	const tabs = useMemo(() => {
		return Children.map(children, (node, i) => {
			const { key, props: nodeProps } = node;
			const { title, children } = nodeProps;

			return {
				key: key || i,
				title,
				content: children,
			};
		});
	}, [children]);

	const handleNavClick = useCallback(
		(key) => {
			if (key === activeKey) return;

			setActiveKey(key);
		},
		[activeKey]
	);

	useEffect(() => {
		const index = tabs.findIndex((tab) => tab.key === activeKey);
		const nav = navRefs.current[index];

		if (!nav) return;
		const { offsetHeight, offsetLeft, offsetTop, offsetWidth } = nav;
		setBarStyle({
			top: vertical ? offsetTop : "1.6em",
			height: vertical ? offsetHeight : "1.2em",
			left: vertical ? "1.6em" : offsetLeft,
			width: vertical ? "1.2em" : offsetWidth,
		});
	}, [activeKey]);

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
								ref={(ref) => (navRefs.current[i] = ref)}
								className={classNames("i-tab-nav", {
									"i-tab-active": activeKey === key,
								})}
								onClick={() => handleNavClick(key, i)}
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

Tabs.Item = () => <></>;

export default Tabs;
