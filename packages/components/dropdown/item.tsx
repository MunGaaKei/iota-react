import List from "../list";
import Popup from "../popup";
import { IDropItem } from "./type";

const { Item: ListItem } = List;

const Item = (props: IDropItem) => {
	const { more, ...restProps } = props;
	const Li = <ListItem {...restProps} />;

	if (!more) return Li;

	return (
		<Popup
			content={<List className='i-dropdown-content'>{more}</List>}
			position='right'
			touchable
		>
			{Li}
		</Popup>
	);
};

export default Item;
