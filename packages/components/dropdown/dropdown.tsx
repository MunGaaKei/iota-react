import { List, Popup } from "@p";
import "./index.scss";
import Item from "./item";
import { IDropdown } from "./type";

const Dropdown = (props: IDropdown): JSX.Element => {
	const {
		trigger = "click",
		position = "bottom",
		width,
		content,
		children,
		...restProps
	} = props;

	return (
		<Popup
			trigger={trigger}
			position={position}
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
