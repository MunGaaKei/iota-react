import classNames from "classnames";
import { TreeItem } from "./item";
import { ITree } from "./type";

function TreeList(props: ITree) {
	const {
		items = [],
		depth = 0,
		round,
		style,
		className,
		parent,
		...restProps
	} = props;

	const contents = items.map((item, i) => {
		const { key, type, title } = item;
		const itemKey =
			key ||
			(props.keyProp && item[props.keyProp]) ||
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

		return (
			<TreeItem
				key={itemKey}
				index={i}
				item={item}
				depth={depth}
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
