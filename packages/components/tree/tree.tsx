import { useReactive } from "ahooks";
import classNames from "classnames";
import "./index.scss";
import { TreeItem } from "./item";
import { Props } from "./type";

function Tree(props: Props): JSX.Element {
	const { items = [], depth = 0, round, onItemClick, ...rest } = props;
	const state = useReactive({
		active: [],
	});

	return (
		<div
			className={classNames("i-tree", {
				"i-tree-round": round,
			})}
			{...rest}
		>
			{items.map((item, i) => {
				const { key, type, title } = item;
				const index = key || `${depth}-${i}`;

				if (type === "title") {
					return (
						<div key={index} className='i-tree-group-title'>
							{title}
						</div>
					);
				}

				return (
					<TreeItem
						key={index}
						item={item}
						depth={depth}
						onItemClick={onItemClick}
					/>
				);
			})}
		</div>
	);
}

export default Tree;
