import classNames from "classnames";
import { TreeItem } from "./item";
import { ITree } from "./type";

function TreeList(props: ITree) {
	const {
		items = [],
		selectable,
		depth = 0,
		depthPrefix = "0",
		round,
		style,
		className,
		...restProps
	} = props;

	const contents = items.map((item, i) => {
		const { type, title, key } = item;
		const itemKey = key || `${depthPrefix}-${i}`;

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
				depthPrefix={`${depthPrefix}-${i}`}
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
