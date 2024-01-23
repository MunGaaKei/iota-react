import classNames from "classnames";
import { TreeItem } from "./item";
import { ITree } from "./type";

function TreeList(props: ITree) {
	const {
		items = [],
		depth = 0,
		keyPrefix,
		round,
		style,
		className,
		...restProps
	} = props;

	const contents = items.map((item, i) => {
		const { type, title, key } = item;
		const itemKey = key || (depth > 0 ? `${keyPrefix}-${i}` : `${i}`);

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
				keyPrefix={itemKey}
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
