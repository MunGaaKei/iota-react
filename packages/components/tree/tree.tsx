import { useReactive } from "ahooks";
import { useEffect } from "react";
import "./index.scss";
import TreeList from "./list";
import { ITree, ITreeItem } from "./type";

function Tree(props: ITree) {
	const {
		selected,
		checked = [],
		checkable,
		selectable,
		onItemSelect,
		onItemCheck,
		...restProps
	} = props;
	const state = useReactive({
		selected,
		checked,
	});

	const handleSelect = (key: string) => {
		if (!selectable) return;

		state.selected = key;
	};

	const handleCheck = (item: ITreeItem, checked: boolean) => {
		if (!checkable) return;

		const i = state.checked.findIndex((key) => item.key === key);

		if (i > -1 && !checked) {
			state.checked.splice(i, 1);
		} else if (i < 0 && checked) {
			state.checked.push(item.key as string);
		}
	};

	useEffect(() => {
		state.selected = selected;
	}, [selected]);

	return (
		<TreeList
			checkable={checkable}
			selectable={selectable}
			selected={state.selected}
			checked={state.checked}
			onItemCheck={handleCheck}
			onItemSelect={handleSelect}
			{...restProps}
		/>
	);
}

export default Tree;
