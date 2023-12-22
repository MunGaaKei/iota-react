import "./index.scss";
import { Props } from "./type";

const Flex = (props: Props): JSX.Element => {
	const {
		as: Tag = "div",
		align,
		justify,
		direction,
		wrap,
		gap,
		...restProps
	} = props;

	return (
		<Tag
			style={{
				alignItems: align,
				justifyContent: justify,
				gap,
				flexDirection: direction,
				flexWrap: wrap,
			}}
			{...restProps}
		/>
	);
};

export default Flex;
