import classNames from "classnames";
import { Children, useMemo } from "react";
import { Banner, Footer, Header, Tailer } from "./area";
import "./index.scss";
import { Props } from "./type";

const Card = (props: Props): JSX.Element => {
	const { shadow = true, border = true, style, className, children } = props;

	const slots: any = useMemo(() => {
		const nodes = {};

		Children.map(children, (child: any) => {
			const name = child.type?.iotaName;

			switch (name) {
				case "CardHeader":
					nodes["header"] = child;
					break;
				case "CardFooter":
					nodes["footer"] = child;
					break;
				case "CardBanner":
					nodes["banner"] = child;
					break;
				case "CardTailer":
					nodes["tailer"] = child;
					break;
				default:
					nodes["content"] = [...(nodes["content"] || []), child];
					break;
			}
		});

		return nodes;
	}, [children]);

	const { header, banner, content, footer, tailer } = slots;

	return (
		<div
			style={style}
			className={classNames("i-card", className, {
				shadow,
				"i-card-bordered": border,
			})}
		>
			{banner}

			{header}

			{content && <div className='i-card-content'>{content}</div>}

			{footer}

			{tailer}
		</div>
	);
};

Card.Header = Header;
Card.Footer = Footer;
Card.Banner = Banner;
Card.Tailer = Tailer;

export default Card;
