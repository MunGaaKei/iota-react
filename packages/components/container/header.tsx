function Header(props) {
	const { children } = props;

	return <div className='i-header'>{children}</div>;
}

Header.iotaName = "ContainerHeader";

export default Header;
