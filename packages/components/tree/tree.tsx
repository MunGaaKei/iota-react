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

	const checkItem = useMemoizedFn((item: ITreeItem, checked: boolean) => {
		if (item.checked === checked) return;

		const { key, parent } = item;
		item.checked = checked;

		if (checked) {
			return;
		}

		if (item.children) {
		}
	});

	const handleSelect = (key: string, item: ITreeItem) => {
		if (!props.selectable) return;

		state.selected = key;
		onItemSelect?.(key, item);
	};

	const handleCheck = (item: ITreeItem, checked: boolean) => {
		checkItem(item, checked);
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
