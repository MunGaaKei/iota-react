import { useReactive } from "ahooks";
import { forwardRef, useEffect, useRef } from "react";
import Area from "./Area";
import Sider from "./Sider";
import "./container.scss";
import { Props } from "./type";

const Container = forwardRef<HTMLDivElement, Props>(
	(props, ref): JSX.Element => {
		const {
			layout = "default",
			collapsed = false,
			breakpoint,
			sider,
			header: Header,
			footer: Footer,
			drawer,
			children,
			onToggle,
		} = props;

		const $sider = useRef<HTMLDivElement>(null);
		const state = useReactive({
			contentStyle: {},
			collapsed,
			mini: false,
		});

		useEffect(() => {
			onToggle?.(state.collapsed);

			if (drawer && state.mini) return;

			const siderWidth = $sider.current?.offsetWidth || 0;

			state.contentStyle = {
				marginLeft: state.collapsed ? -siderWidth : 0,
			};
		}, [state.collapsed, drawer]);

		useEffect(() => {
			state.collapsed = collapsed;
		}, [collapsed]);

		useEffect(() => {
			if (!breakpoint) return;

			const mql = matchMedia(`(max-width: ${breakpoint}px)`);

			const listener = () => {
				state.collapsed = mql.matches;
				state.mini = mql.matches;
			};
			listener();
			mql.addEventListener("change", listener);

			return () => {
				mql.removeEventListener("change", listener);
			};
		}, [breakpoint]);

		switch (layout) {
			case "menu":
				return (
					<div className='i-container flex'>
						<Sider
							ref={$sider}
							collapsed={state.collapsed}
							mini={state.mini}
							onHide={() => (state.collapsed = true)}
						>
							{sider}
						</Sider>

						<div
							ref={ref}
							className='i-content'
							style={state.contentStyle}
						>
							<Area name='header'>{Header}</Area>

							{children}

							<Area name='footer'>{Footer}</Area>
						</div>
					</div>
				);
			default:
				return (
					<div className='i-container i-container-default'>
						<Area name='header'>{Header}</Area>

						<div className='i-container-flex'>
							<Sider ref={$sider} collapsed={state.collapsed}>
								{sider}
							</Sider>
							<div
								ref={ref}
								className='i-content'
								style={state.contentStyle}
							>
								{children}
							</div>
						</div>

						<Area name='footer'>{Footer}</Area>
					</div>
				);
		}
	}
);

export default Container;
