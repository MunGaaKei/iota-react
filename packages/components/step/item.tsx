import classNames from "classnames";
import { IStepItem } from "./type";

function Item(props: IStepItem) {
	const { active, icon, className, children } = props;

	return (
		<div
			className={classNames("i-step-item", className, {
				"i-step-item-active": active,
			})}
		>
			{children}
		</div>
	);
}

export default Item;
