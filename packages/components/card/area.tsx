import classNames from "classnames";

const Header = (props) => (
	<div
		style={props.style}
		className={classNames("i-card-header", props.className)}
	>
		{props.children}
	</div>
);

const Footer = (props) => (
	<div
		style={props.style}
		className={classNames("i-card-footer", props.className)}
	>
		{props.children}
	</div>
);

const Banner = (props) => (
	<div
		style={props.style}
		className={classNames("i-card-banner", props.className)}
	>
		{props.children}
	</div>
);

Header.iotaName = "CardHeader";
Footer.iotaName = "CardFooter";
Banner.iotaName = "CardBanner";

export { Banner, Footer, Header };
