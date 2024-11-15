import classNames from "classnames";
import { TreeItem } from "./item";
import { ITree } from "./type";

interface ITreeList extends Omit<ITree, "nodeProps"> {
	nodeProps: {
		key: string;
		title: string;
		children: string;
	};
}

function TreeList(props: ITreeList) {
	const {
		data = [],
		depth = 0,
		round,
		style,
		className,
		parent,
		nodeProps,
		...restProps
	} = props;

	const contents = data.map((item, i) => {
		const { type } = item;
		const title = item[nodeProps.title];
		const itemKey =
			item[nodeProps.key] ||
			(parent?.key !== undefined ? `${parent.key}-${i}` : `${i}`);

		item.key = itemKey;
		item.parent = parent;

		if (type === "title") {
			return (
				<div key={i} className='i-tree-group-title'>
					{title}
				</div>
			);
		}

		if (type && type !== "item") {
			return (
				<div key={i} className={`i-tree-type-${type}`}>
					{title}
				</div>
			);
		}

		return (
			<TreeItem
				key={itemKey}
				index={i}
				item={item}
				depth={depth}
				nodeProps={nodeProps}
				{...restProps}
			/>
		);
	});

	if (depth > 0) return <>{contents}</>;

	return (
		<div
			className={classNames("i-tree", className, {
				"i-tree-round": round,
			})}
			style={style}
		>
			{contents}
		</div>
	);
}

export default TreeList;
