import {
	ReactNode,
	useEffect,
	useRef,
	forwardRef,
	useState,
	CSSProperties,
} from "react";
import "./container.scss";

type PropsSider = {
	children?: ReactNode;
	collapsed?: boolean;
};

type PropsArea = {
	children?: ReactNode;
	name: string;
};

export interface PropsContainer extends PropsSider {
	layout?: "default" | "menu";
	breakpoint?: number;
	sider?: ReactNode;
	header?: ReactNode;
	footer?: ReactNode;
}

const SiderLayout = forwardRef<HTMLDivElement, PropsSider>((props, ref) => {
	const { children, collapsed = false } = props;

	if (!children) return <></>;

	return (
		<div
			className='i-sider'
			style={{ transform: collapsed ? `translate3d(-100%, 0, 0)` : "" }}
			ref={ref}
		>
			{children}
		</div>
	);
});

const Area = ({ children, name }: PropsArea) => {
	if (!children) return <></>;

	return name === "header" ? (
		<header className='i-header'>{children}</header>
	) : (
		<footer className='i-footer'>{children}</footer>
	);
};

const Container = ({
	layout = "default",
	collapsed = false,
	breakpoint,
	header: Header,
	sider: Sider,
	footer: Footer,
	children,
}: PropsContainer): JSX.Element => {
	const siderEl = useRef<HTMLDivElement>(null);
	const [contentStyle, setContentStyle] = useState<CSSProperties>({});

	useEffect(() => {
		if (!Sider || !siderEl.current) return;

		const siderWidth = siderEl.current.offsetWidth;
		setContentStyle(
			collapsed
				? {
						["marginLeft"]: `-${siderWidth}px`,
				  }
				: {}
		);
	}, [collapsed, breakpoint]);

	switch (layout) {
		case "menu":
			return (
				<div className='i-container flex'>
					<SiderLayout ref={siderEl} collapsed={collapsed}>
						{Sider}
					</SiderLayout>
					<div className='i-content' style={contentStyle}>
						<Area name='header'>{Header}</Area>
						{children}
						<Area name='footer'>{Footer}</Area>
					</div>
				</div>
			);
		default:
			return (
				<div className='i-container'>
					<Area name='header'>{Header}</Area>
					<div className='flex'>
						<SiderLayout ref={siderEl} collapsed={collapsed}>
							{Sider}
						</SiderLayout>
						<div className='i-content' style={contentStyle}>
							{children}
						</div>
					</div>
					<Area name='footer'>{Footer}</Area>
				</div>
			);
	}
};

export default Container;
