import { useReactive } from "ahooks";
import { CSSProperties, forwardRef, useEffect, useRef } from "react";
import "./container.scss";
import { Props, PropsArea, PropsSider } from "./type";

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
		<header className='i-header bg-blur'>{children}</header>
	) : (
		<footer className='i-footer bg-blur'>{children}</footer>
	);
};

const Container = (props: Props): JSX.Element => {
	const {
		layout = "default",
		collapsed = false,
		breakpoint,
		header: Header,
		sider: Sider,
		footer: Footer,
		onToggle,
		children,
	} = props;

	const $container = useRef<HTMLDivElement>(null);
	const $sider = useRef<HTMLDivElement>(null);
	const state = useReactive<{
		contentStyle: CSSProperties;
		collapsed: boolean;
	}>({
		contentStyle: {},
		collapsed,
	});

	useEffect(() => {
		const siderWidth = $sider.current?.offsetWidth;

		state.contentStyle = state.collapsed
			? {
					["marginLeft"]: `-${siderWidth}px`,
			  }
			: {};
		onToggle?.(state.collapsed);
	}, [state.collapsed]);

	useEffect(() => {
		state.collapsed = collapsed;
	}, [collapsed]);

	useEffect(() => {
		if (!breakpoint) return;

		const mql = matchMedia(`(max-width: ${breakpoint}px)`);
		const listener = () => {
			state.collapsed = mql.matches;
		};
		mql.addEventListener("change", listener);

		return () => {
			mql.removeEventListener("change", listener);
		};
	}, [breakpoint]);

	switch (layout) {
		case "menu":
			return (
				<div ref={$container} className='i-container flex'>
					<SiderLayout ref={$sider} collapsed={state.collapsed}>
						{Sider}
					</SiderLayout>

					<div className='i-content' style={state.contentStyle}>
						<Area name='header'>{Header}</Area>

						{children}

						<Area name='footer'>{Footer}</Area>
					</div>
				</div>
			);
		default:
			return (
				<div ref={$container} className='i-container'>
					<Area name='header'>{Header}</Area>

					<div className='flex'>
						<SiderLayout ref={$sider} collapsed={state.collapsed}>
							{Sider}
						</SiderLayout>
						<div className='i-content' style={state.contentStyle}>
							{children}
						</div>
					</div>

					<Area name='footer'>{Footer}</Area>
				</div>
			);
	}
};

export default Container;
