import classNames from "classnames";
import { Children, ReactNode, useMemo } from "react";
import Divider from "./divider";
import "./index.scss";
import Item from "./item";
import { IStep } from "./type";

const Step = (props: IStep): JSX.Element => {
	const {
		active = 0,
		divider = <Divider />,
		style,
		className,
		children,
	} = props;

	const steps = useMemo(() => {
		const nodes: ReactNode[] = [];

		Children.map(children, (el: any, i) => {
			if (!el || el.type !== Item) return;

			const { props: elProps } = el;

			nodes.push({
				...el,
				props: {
					...elProps,
					active: active === i,
				},
			});
		});

		return nodes;
	}, [active, children]);

	return (
		<div className={classNames("i-step", className)} style={style}>
			{steps}
		</div>
	);
};

Step.Item = Item;

export default Step;
