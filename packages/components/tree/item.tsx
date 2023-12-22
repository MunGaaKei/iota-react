import { KeyboardArrowDownRound } from "@ricons/material";
import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import { MouseEvent } from "react";
import Icon from "../icon";
import Tree from "./tree";
import { Props, TTreeHeader, TTreeItem } from "./type";

const Header = (props: TTreeHeader) => {
	const { as: Tag = "a", href, children, active, ...rest } = props;

	const className = classNames("i-tree-item-header", {
		"i-tree-item-active": active,
	});

	if (typeof Tag === "string") {
		return (
			<Tag href={href} className={className} {...rest}>
				{children}
			</Tag>
		);
	}

	return (
		<Tag to={href || ""} className={className} {...rest}>
			{children}
		</Tag>
	);
};

export const TreeItem = (props: Omit<Props, "items"> & { item: TTreeItem }) => {
	const { item, depth = 0, onItemClick } = props;
	const {
		as,
		href,
		icon,
		title,
		children = [],
		active,
		expanded,
		disabled,
	} = item;

	const state = useReactive({
		expanded,
	});

	const handleExpand = useMemoizedFn(
		(e: MouseEvent<HTMLElement>, fromToggle?: boolean) => {
			if (fromToggle) {
				e.preventDefault();
				e.stopPropagation();
			}

			if (disabled || !children.length) return;

			state.expanded = !state.expanded;
		}
	);

	const handleItemClick = useMemoizedFn((e: MouseEvent<HTMLElement>) => {
		if (disabled) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}

		item.active = !item.active;
		handleExpand(e);
		onItemClick?.(item, e);
	});

	return (
		<div
			className={classNames("i-tree-item", {
				"i-tree-expand": state.expanded,
			})}
		>
			<Header
				as={as}
				href={href}
				style={{ paddingLeft: `${depth * 1.5 + 0.5}em` }}
				active={active}
				onClick={handleItemClick}
			>
				{icon && <span className='i-tree-item-icon'>{icon}</span>}
				<span className='i-tree-item-title'>{title}</span>

				{children.length > 0 && (
					<Icon
						icon={<KeyboardArrowDownRound />}
						className='i-tree-toggle'
						onClick={(e) => handleExpand(e, true)}
					></Icon>
				)}
			</Header>

			{children?.length > 0 && (
				<div className='i-tree-item-content'>
					<Tree items={children} depth={depth + 1} />
				</div>
			)}
		</div>
	);
};
