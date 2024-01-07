import classNames from "classnames";
import { forwardRef } from "react";
import { ISider, PropsSider } from "./type";

const Sider = forwardRef<HTMLDivElement, PropsSider>((props, ref) => {
	const { mini, collapsed, children, onHide } = props;

	if (!children) return <></>;

	return (
		<div
			ref={ref}
			className={classNames("i-sider", {
				"i-sider-mini": mini,
				"i-sider-hidden": collapsed,
			})}
			onClick={onHide}
		>
			<div
				className='i-sider-content'
				onClick={(e) => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
}) as ISider;

Sider.iotaName = "ContainerSider";

export default Sider;
