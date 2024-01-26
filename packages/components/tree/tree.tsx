import { useMemoizedFn, useReactive } from "ahooks";
import { useEffect } from "react";
import "./index.scss";
import TreeList from "./list";
import { ITree, ITreeItem } from "./type";

function Tree(props: ITree) {
	const {
		selected,
		checked = [],
		onItemSelect,
		onItemCheck,
		...restProps
	} = props;
	const state = useReactive({
		selected,
		checked,
	});

	const isChecked = (key?: string) => state.checked.includes(key || "");

	const checkItem = useMemoizedFn(
		(item: ITreeItem, checked: boolean, direction?: "root" | "leaf") => {
			const { key, parent, children } = item;
			const result = [key as string];

			if (checked) {
				if (parent && !isChecked(parent.key) && direction !== "leaf") {
					const unchecked = parent.children?.some(
						(o) => o.key !== key && !isChecked(o.key)
					);

					!unchecked &&
						result.push(...checkItem(parent, true, "root"));
				}
				if (children?.length && direction !== "root") {
					children.map((o) => {
						!isChecked(o.key) &&
							result.push(...checkItem(o, true, "leaf"));
					});
				}
				return result;
			}

			if (parent && isChecked(parent?.key) && direction !== "leaf") {
				result.push(...checkItem(parent, false, "root"));
			}
			if (children?.length && direction !== "root") {
				children.map((o) => {
					isChecked(o.key) &&
						result.push(...checkItem(o, false, "leaf"));
				});
			}
			return result;
		}
	);

	const handleSelect = (key: string, item: ITreeItem) => {
		if (!props.selectable) return;

		state.selected = key;
		onItemSelect?.(key, item);
	};

	const handleCheck = (item: ITreeItem, checked: boolean) => {
		const result = checkItem(item, checked);

		state.checked = checked
			? Array.from(new Set([...state.checked, ...result]))
			: state.checked.filter((k) => !result.includes(k));

		onItemCheck?.(item, checked, state.checked);
	};

	useEffect(() => {
		if (selected === undefined) return;

		state.selected = selected;
	}, [selected]);

	return (
		<TreeList
			selected={state.selected}
			checked={state.checked}
			onItemCheck={handleCheck}
			onItemSelect={handleSelect}
			{...restProps}
		/>
	);
}

export default Tree;
