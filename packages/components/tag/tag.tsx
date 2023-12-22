import classNames from "classnames";
import Helpericon from "../utils/helpericon";
import "./index.scss";
import { Props } from "./type";

const Tag = (props: Props): JSX.Element => {
	const {
		dot,
		dotClass,
		outline,
		round,
		size,
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
					[`i-tag-${size}`]: size !== "normal",
					rounded: round,
				},
				className
			)}
			onClick={onClick}
			{...restProps}
		>
			{dot && <span className={classNames("i-tag-dot", dotClass)}></span>}

			{children}

			{onClose && <Helpericon active className='i-tag-close' />}
		</span>
	);
};

export default Tag;
