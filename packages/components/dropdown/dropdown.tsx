import { Popup } from "@p";
import "./index.scss";
import { Props } from "./type";

const Dropdown = (props: Props): JSX.Element => {
	const {
		trigger = "click",
		position = "bottom",
		list = [],
		children,
		...restProps
	} = props;

	return (
		<Popup trigger={trigger} position={position} {...restProps}>
			{children}
		</Popup>
	);
};

export default Dropdown;
