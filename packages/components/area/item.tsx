import classNames from "classnames";

function Area(props) {
	const { name = "content", style, className, children } = props;

	return (
		<div
			className={classNames(`i-area-${name}`, className)}
			style={{ gridArea: name, ...style }}
		>
			{children}
		</div>
	);
}

export default Area;
