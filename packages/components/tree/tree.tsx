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
		partofs: {} as Record<string, boolean>,
	});

	const isChecked = (key?: string) => state.checked.includes(key || "");

	const checkItem = useMemoizedFn(
		(item: ITreeItem, checked: boolean, direction?: "root" | "leaf") => {
			const { key = "", parent, children } = item;
			const shouldChanged: Record<string, boolean> = { [key]: checked };
			const partofs: Record<string, boolean> = {};

			if (checked) {
				if (parent && direction !== "leaf") {
					const hasUnchecked = parent.children?.some(
						(o) => o.key !== key && !isChecked(o.key)
					);

					const [changes, parts] = checkItem(parent, true, "root");

					if (!hasUnchecked) {
						Object.assign(shouldChanged, changes);
					}

					Object.assign(partofs, parts, {
						[parent.key as string]: hasUnchecked,
					});
				}

				if (children?.length && direction !== "root") {
					children.map((o) => {
						if (isChecked(o.key)) return;

						const [changes] = checkItem(o, true, "leaf");

						Object.assign(shouldChanged, changes);
					});
				}

				return [shouldChanged, partofs];
			}

			if (parent && direction !== "leaf") {
				const [changes, parts] = checkItem(parent, false, "root");

				Object.assign(shouldChanged, changes);

				const hasChecked = parent.children?.some(
					(o) => isChecked(o.key) && o.key !== key
				);

				Object.assign(partofs, parts, {
					[parent.key as string]: hasChecked,
				});
			}
			if (children?.length && direction !== "root") {
				children.map((o) => {
					const [changes] = checkItem(o, false, "leaf");

					if (!isChecked(o.key)) return;

					Object.assign(shouldChanged, changes);
				});
			}
			return [shouldChanged, partofs];
		}
	);

	const handleCheck = (item: ITreeItem, checked: boolean) => {
		const [shouldChanged, partofs] = checkItem(item, checked);
		const changedKeys = Object.keys(shouldChanged);

		state.checked = checked
			? Array.from(new Set([...state.checked, ...changedKeys]))
			: state.checked.filter((k) => !changedKeys.includes(k));

		Object.assign(state.partofs, partofs);

		onItemCheck?.(item, checked, state.checked);
	};

	const handleSelect = (key: string, item: ITreeItem) => {
		if (!props.selectable) return;

		state.selected = key;
		onItemSelect?.(key, item);
	};

	useEffect(() => {
		if (selected === undefined) return;

		state.selected = selected;
	}, [selected]);

	return (
		<TreeList
			selected={state.selected}
			checked={state.checked}
			partofs={state.partofs}
			onItemCheck={handleCheck}
			onItemSelect={handleSelect}
			{...restProps}
		/>
	);
}

export default Tree;
