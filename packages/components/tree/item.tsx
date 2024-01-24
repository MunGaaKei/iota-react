import { KeyboardArrowDownRound } from "@ricons/material";
import { useMemoizedFn } from "ahooks";
import classNames from "classnames";
import { MouseEvent, useState } from "react";
import Checkbox from "../checkbox";
import Icon from "../icon";
import TreeList from "./list";
import { ITreeHeader, PropsTreeItem } from "./type";

const Header = (props: ITreeHeader) => {
	const { as: Tag = "a", href, selected, children, ...restProps } = props;

	const className = classNames("i-tree-item-header", {
		"i-tree-item-selected": selected,
	});

	if (typeof Tag === "string") {
		return (
			<Tag href={href} className={className} {...restProps}>
				{children}
			</Tag>
		);
	}

	return (
		<Tag to={href || ""} className={className} {...restProps}>
			{children}
		</Tag>
	);
};

export const TreeItem = (props: PropsTreeItem) => {
	const {
		item,
		depth = 0,
		index,
		selected,
		checked = [],
		keyProp,
		checkable,
		onItemClick,
		onItemSelect,
		onItemCheck,
		...restProps
	} = props;

	const {
		as,
		key = "",
		href,
		icon,
		title,
		children = [],
		expanded,
		disabled,
	} = item;

	const [expand, setExpand] = useState(expanded);
	const partof = false;

	const handleExpand = useMemoizedFn(
		(e: MouseEvent<HTMLElement>, fromToggle?: boolean) => {
			if (fromToggle) {
				e.preventDefault();
				e.stopPropagation();
			}

			if (disabled || !children.length) return;

			setExpand((v) => !v);
		}
	);

	const handleItemClick = useMemoizedFn((e: MouseEvent<HTMLElement>) => {
		if (disabled) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}

		handleExpand(e);
		onItemClick?.(item, e);
		onItemSelect?.(key);
	});

	const handleItemCheck = (checked, e) => {
		onItemCheck?.(item, checked, e);
	};

	return (
		<div
			className={classNames("i-tree-item", {
				"i-tree-expand": expand,
			})}
		>
			<Header
				as={as}
				href={href}
				style={{ paddingLeft: `${depth * 1.5 + 0.5}em` }}
				selected={selected === key}
				onClick={handleItemClick}
			>
				{checkable && (
					<Checkbox.Item
						value={checked.includes(key)}
						partof={partof}
						className='i-tree-checkbox'
						onChange={handleItemCheck}
						onClick={(e) => e.stopPropagation()}
					/>
				)}

				{icon && <span className='i-tree-item-icon'>{icon}</span>}

				<span className='i-tree-item-title'>{title}</span>

				{children.length > 0 && (
					<Icon
						icon={<KeyboardArrowDownRound />}
						className='i-tree-toggle'
						onClick={(e) => handleExpand(e, true)}
					/>
				)}
			</Header>

			{children?.length > 0 && (
				<div className='i-tree-item-content'>
					<TreeList
						items={children}
						depth={depth + 1}
						selected={selected}
						keyProp={keyProp}
						parentKey={key}
						checkable={checkable}
						onItemClick={onItemClick}
						onItemSelect={onItemSelect}
						onItemCheck={onItemCheck}
						{...restProps}
					/>
				</div>
			)}
		</div>
	);
};
