import classNames from "classnames";
import { useMemo } from "react";
import "./index.css";
import { IFlex } from "./type";

const Flex = (props: IFlex): JSX.Element => {
	const {
		as: Component = "div",
		align,
		justify,
		direction,
		wrap,
		gap,
		columns,
		className,
		...restProps
	} = props;

	const gridColumns = useMemo(() => {
		if (!columns) return;

		if (typeof columns === "number") return `repeat(${columns}, 1fr)`;

		return columns;
	}, [columns]);

	return (
		<Component
			style={{
				alignItems: align,
				justifyContent: justify,
				gap,
				flexDirection: direction,
				flexWrap: wrap === true ? "wrap" : wrap,
				gridTemplateColumns: gridColumns as any,
			}}
			className={classNames(className, {
				[columns ? "grid" : "flex"]: true,
			})}
			{...restProps}
		/>
	);
};

export default Flex;
