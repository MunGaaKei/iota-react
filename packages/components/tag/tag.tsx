import classNames from "classnames";
import Helpericon from "../helpericon";
import "./index.scss";
import { Props } from "./type";

const Tag = (props: Props): JSX.Element => {
	const {
		hideDot,
		dotClass,
		outline,
		className,
		children,
		onClose,
		onClick,
		...restProps
	} = props;

	return (
		<span
			className={classNames(
				"i-tag",
				{
					"i-tag-outline": outline,
					"i-tag-clickable": onClick,
				},
				className
			)}
			onClick={onClick}
			{...restProps}
		>
			{!hideDot && (
				<span className={classNames("i-tag-dot", dotClass)}></span>
			)}
			{children}
			{onClose && <Helpericon active className='i-tag-close' />}
		</span>
	);
};

export default Tag;
