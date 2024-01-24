import classNames from "classnames";
import { TreeItem } from "./item";
import { ITree } from "./type";

function TreeList(props: ITree) {
	const {
		items = [],
		depth = 0,
		parentKey,
		keyProp,
		round,
		style,
		className,
		...restProps
	} = props;

	const contents = items.map((item, i) => {
		const { type, title, key } = item;
		const itemKey =
			key ||
			(keyProp && item[keyProp]) ||
			(depth > 0 ? `${parentKey}-${i}` : `${i}`);
		if (!item.key) item.key = itemKey;

		if (type === "title") {
			return (
				<div key={itemKey} className='i-tree-group-title'>
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
