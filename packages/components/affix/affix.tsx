import classNames from "classnames";
import { debounce } from "lodash";
import {
	Children,
	MouseEvent,
	cloneElement,
	useEffect,
	useMemo,
	useState,
} from "react";
import "./index.scss";
import ToTop from "./totop";
import { Props } from "./type";

const Affix = (props: Props): JSX.Element => {
	const {
		position = "fixed",
		left,
		top,
		right,
		bottom,
		offset,
		style,
		className,
		children,
		getContainer = () => document?.body,
	} = props;

	const [hidden, setHidden] = useState(false);

	const hijackChildren = useMemo(
		() =>
			Children.map(children, (node: any) => {
				if (node.type?.iotaname === "AffixToTop") {
					const { onClick } = node.props;

					return cloneElement(node, {
						key: node.key,
						...node.props,
						onClick: (e: MouseEvent) => {
							const container = getContainer();

							onClick?.(e);
							container?.scrollTo({
								top: 0,
								left: 0,
								behavior: "smooth",
							});
						},
					});
				}

				return node;
			}),
		[children, getContainer]
	);

	useEffect(() => {
		const container = getContainer();
		if (!offset || !container) return;

		const listener = debounce(() => {
			const top = container.scrollTop;
			setHidden(top < offset);
		}, 160);
		listener();

		container.addEventListener("scroll", listener);

		return () => {
			container.removeEventListener("scroll", listener);
		};
	}, [offset, getContainer]);

	return (
		<div
			className={classNames("i-affix", className, {
				"i-affix-hidden": hidden,
			})}
			style={{
				...style,
				position,
				left,
				top,
				right,
				bottom,
			}}
		>
			{hijackChildren}
		</div>
	);
};

Affix.ToTop = ToTop;

export default Affix;
