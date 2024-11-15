import { useMemoizedFn, useReactive } from "ahooks";
import { forwardRef, useEffect, useImperativeHandle, useMemo } from "react";
import "./index.css";
import TreeList from "./list";
import { ITree, ITreeItem, RefTree } from "./type";

const defaultNodeProps = {
	key: "key",
	title: "title",
	children: "children",
};

const Tree = forwardRef<RefTree, ITree>((props, ref) => {
	const {
		data = [],
		selected,
		checked = [],
		disabledRelated,
		nodeProps,
		onItemSelect,
		onItemCheck,
		...restProps
	} = props;
	const state = useReactive({
		selected,
		checked,
		partofs: {} as Record<string, boolean>,
	});
	const oNodeProps = Object.assign({}, defaultNodeProps, nodeProps);

	const dataMaps = useMemo(() => {
		if (!props.checkable && !props.selectable) return [];

		const flatFn = (nodes) => {
			return nodes.flatMap((o) => {
				const children = o[oNodeProps.children];
				if (children?.length > 0) {
					return [o, ...flatFn(children)];
				}
				return [o];
			});
		};

		return flatFn(data);
	}, [data, props.selectable, props.checkable]);

	const isChecked = (key?: string) => state.checked.includes(key || "");

	const checkItem = useMemoizedFn(
		(item: ITreeItem, checked: boolean, direction?: "root" | "leaf") => {
			const { key = "", parent, children } = item;
			const shouldChanged = { [key]: checked };
			const partofs = { [key]: false };

			if (disabledRelated) return [shouldChanged];

			if (checked) {
				if (parent && direction !== "leaf") {
					const hasUnchecked = parent.children?.some(
						(o) => o.key !== key && !isChecked(o.key)
					);

					const [changes, parts] = checkItem(parent, true, "root");

					if (!hasUnchecked) {
						Object.assign(shouldChanged, changes);
					}

					Object.assign(partofs, hasUnchecked ? parts : {}, {
						[parent.key as string]: true,
					});
				}

				if (children?.length && direction !== "root") {
					children.map((o) => {
						if (isChecked(o.key)) return;

						const [changes] = checkItem(o, true, "leaf");

						Object.assign(shouldChanged, changes);
						partofs[o.key as string] = false;
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

				Object.assign(partofs, hasChecked ? {} : parts, {
					[parent.key as string]: hasChecked,
					[key]: false,
				});
			}
			if (children?.length && direction !== "root") {
				children.map((o) => {
					const [changes] = checkItem(o, false, "leaf");

					if (!isChecked(o.key)) return;

					Object.assign(shouldChanged, changes);
					partofs[o.key as string] = false;
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

	useImperativeHandle(ref, () => {
		return {
			getChecked: () => [state.checked, []],
			getSelected: () => [state.selected],
			getPartofs: () => {
				return dataMaps;
			},
		};
	});

	return (
		<TreeList
			data={data}
			selected={state.selected}
			checked={state.checked}
			partofs={state.partofs}
			nodeProps={oNodeProps}
			onItemCheck={handleCheck}
			onItemSelect={handleSelect}
			{...restProps}
		/>
	);
});

export default Tree;
