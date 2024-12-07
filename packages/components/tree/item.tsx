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
		partofs = {},
		checkable,
		nodeProps,
		renderExtra,
		onItemClick,
		onItemSelect,
		onItemCheck,
		...restProps
	} = props;

	const { as, key = "", href, icon, title, expanded, disabled } = item;
	const children = item[nodeProps.children];

	const [expand, setExpand] = useState(expanded);

	const handleExpand = useMemoizedFn(
		(e: MouseEvent<HTMLElement>, fromToggle?: boolean) => {
			if (fromToggle) {
				e.preventDefault();
				e.stopPropagation();
			}

			if (disabled || !children?.length) return;

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
		onItemSelect?.(key, item);
	});

	const handleItemCheck = (checked) => onItemCheck?.(item, checked, []);
	const itemChecked = checked.includes(key);

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
						value={itemChecked}
						partof={!itemChecked && partofs[key]}
						className='i-tree-checkbox'
						onChange={handleItemCheck}
						onClick={(e) => e.stopPropagation()}
					/>
				)}

				{icon && <span className='i-tree-item-icon'>{icon}</span>}

				<span className='i-tree-item-title'>{title}</span>

				{renderExtra?.(item)}

				{children && (
					<Icon
						icon={<KeyboardArrowDownRound />}
						className='i-tree-toggle'
						onClick={(e) => handleExpand(e, true)}
					/>
				)}
			</Header>

			{children?.length && (
				<div className='i-tree-item-content'>
					<TreeList
						data={children}
						depth={depth + 1}
						selected={selected}
						checkable={checkable}
						parent={item}
						partofs={partofs}
						checked={checked}
						nodeProps={nodeProps}
						renderExtra={renderExtra}
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
