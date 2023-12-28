const Header = (props) => <div className='i-card-header'>{props.children}</div>;

const Footer = (props) => <div className='i-card-footer'>{props.children}</div>;

const Banner = (props) => <div className='i-card-banner'>{props.children}</div>;

Header.iotaName = "CardHeader";
Footer.iotaName = "CardFooter";
Banner.iotaName = "CardBanner";

export { Banner, Footer, Header };
