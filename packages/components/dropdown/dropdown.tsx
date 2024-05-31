import { List, Popup } from "@p";
import "./index.css";
import Item from "./item";
import { IDropdown } from "./type";

const Dropdown = (props: IDropdown): JSX.Element => {
	const { width, content, children, ...restProps } = props;

	return (
		<Popup
			trigger='click'
			position='bottom'
			touchable
			content={
				<List
					className='i-dropdown-content'
					style={{ minWidth: width }}
				>
					{content}
				</List>
			}
			{...restProps}
		>
			{children}
		</Popup>
	);
};

Dropdown.Item = Item;

export default Dropdown;
