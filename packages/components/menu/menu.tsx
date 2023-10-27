import "./index.scss";
import { MenuItem } from "./item";
import { Props } from "./type";

function Menu(props: Props): JSX.Element {
	const { items = [], depth = 0, onItemClick, ...rest } = props;

	return (
		<div className='i-menu' {...rest}>
			{items.map((item, i) => {
				const { key, type, title } = item;
				const index = key || `${depth}-${i}`;

				if (type === "title") {
					return (
						<div key={index} className='i-menu-group-title'>
							{title}
						</div>
					);
				}

				return (
					<MenuItem
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

export default Menu;
