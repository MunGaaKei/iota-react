import { useReactive } from "ahooks";
import "./index.scss";
import TreeList from "./list";
import { ITree } from "./type";

function Tree(props: ITree) {
	const { selected = [], selectable, onItemSelect, ...restProps } = props;
	const state = useReactive({
		selected,
	});

	const handleSelect = (key: string) => {
		if (!selectable) return;
		state.selected = [key];
	};

	return (
		<TreeList
			selected={state.selected}
			onItemSelect={handleSelect}
			{...restProps}
		/>
	);
}

export default Tree;
