import { MinusRound, PlusRound } from "@ricons/material";
import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import { Children, useMemo } from "react";
import Helpericon from "../utils/helpericon";
import "./index.scss";
import Item from "./item";
import { Props, TKey } from "./type";

const toggleIcon = (isActive: boolean) => {
	return isActive ? <MinusRound /> : <PlusRound />;
};

const Collapse = (props: Props): JSX.Element => {
	const {
		active,
		onlyone,
		className,
		children,
		icon = toggleIcon,
		onCollapse,
		...restProps
	} = props;

	const state = useReactive({
		active,
	});

	const items = useMemo(
		() =>
			Children.map(children, (node, i) => {
				const { key, props: nodeProps } = node as {
					key?: TKey;
					props?: any;
				};
				const { title, children, content } = nodeProps;

				return {
					key: key || i,
					title,
					content: children || content,
				};
			}) || [],
		[children]
	);

	const handleItemClick = useMemoizedFn(
		(key: TKey, before?: TKey | TKey[]) => {
			// onCollapse?.(key, before);

			if (onlyone) {
				state.active = state.active === key ? undefined : key;
				return;
			}

			if (!Array.isArray(state.active)) state.active = [];

			const i = state.active.findIndex((k) => k === key);

			if (i > -1) {
				state.active.splice(i, 1);
			} else {
				state.active.push(key);
			}
		}
	);

	return (
		<div className={classNames("i-collapse", className)} {...restProps}>
			{items.map((item) => {
				const { key, title, content } = item;
				const isActive = onlyone
					? state.active === key
					: ((state.active as TKey[]) || []).includes(key);

				return (
					<div
						key={key}
						className={classNames("i-collapse-item", {
							"i-collapse-active": isActive,
						})}
					>
						<div
							className='i-collapse-header'
							onClick={() => handleItemClick(key)}
						>
							{title}

							<Helpericon
								active
								className='i-collapse-toggle'
								icon={icon(isActive)}
							/>
						</div>

						<div className='i-collapse-content'>{content}</div>
					</div>
				);
			})}
		</div>
	);
};

Collapse.Item = Item;

export default Collapse;
