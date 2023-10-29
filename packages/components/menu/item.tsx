import { KeyboardArrowDownRound } from "@ricons/material";
import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import { MouseEvent } from "react";
import Icon from "../icon";
import Menu from "./menu";
import { Props, TMenuHeader, TMenuItem } from "./type";

const MenuHeader = (props: TMenuHeader) => {
	const { as, href, children, ...rest } = props;
	const As = as || "a";

	if (typeof As === "string") {
		return (
			<As
				href={href}
				className={classNames("i-menu-item-header")}
				{...rest}
			>
				{children}
			</As>
		);
	}

	return (
		<As
			to={href || ""}
			className={classNames("i-menu-item-header")}
			{...rest}
		>
			{children}
		</As>
	);
};

export const MenuItem = (props: Omit<Props, "items"> & { item: TMenuItem }) => {
	const { item, depth = 0, round, onItemClick } = props;
	const { as, href, icon, title, children = [], expanded, disabled } = item;

	const state = useReactive({
		expanded,
	});

	const handleExpand = useMemoizedFn(
		(e: MouseEvent<HTMLElement>, fromToggle?: boolean) => {
			if (fromToggle) {
				e.preventDefault();
				e.stopPropagation();
			}

			if (disabled) return;

			state.expanded = !state.expanded;
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
	});

	return (
		<div
			className={classNames("i-menu-item", {
				"i-menu-expand": state.expanded,
			})}
		>
			<MenuHeader
				as={as}
				href={href}
				style={{ paddingLeft: `${depth * 2 + 0.5}em` }}
				onClick={handleItemClick}
			>
				{icon && <span className='i-menu-item-icon'>{icon}</span>}
				<span className='i-menu-item-title'>{title}</span>

				{children.length > 0 && (
					<Icon
						icon={KeyboardArrowDownRound}
						className='i-menu-toggle'
						onClick={(e) => handleExpand(e, true)}
					></Icon>
				)}
			</MenuHeader>

			{children?.length > 0 && (
				<div className='i-menu-item-content'>
					<Menu items={children} depth={depth + 1} />
				</div>
			)}
		</div>
	);
};
