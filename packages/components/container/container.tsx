import { useReactive } from "ahooks";
import { Children, forwardRef, useEffect, useMemo, useRef } from "react";
import "./container.scss";
import Footer from "./footer";
import Header from "./header";
import Sider from "./sider";
import { IContainer, Props } from "./type";

const Container = forwardRef<HTMLDivElement, Props>(
	(props, ref): JSX.Element => {
		const { collapsed, breakpoint, drawer, children, onToggle } = props;

		const $sider = useRef<HTMLDivElement>(null);
		const state = useReactive({
			contentStyle: {},
			collapsed,
			mini: false,
		});

		const slots = useMemo(() => {
			const nodes: any = {};

			Children.map(children, (child: any) => {
				const name = child.type?.iotaName;
				console.log(child);

				switch (name) {
					case "ContainerHeader":
						nodes["header"] = child;
						break;
					case "ContainerFooter":
						nodes["footer"] = child;
						break;
					default:
						nodes["content"] = [...(nodes["content"] || []), child];
						break;
				}
			});

			return nodes;
		}, [children]);

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
			mql.addEventListener("change", listener);

			return () => {
				mql.removeEventListener("change", listener);
			};
		}, [breakpoint]);

		const { header, content, footer } = slots;

		return (
			<div className='i-container'>
				{header}

				<div className='flex'>
					<div
						className='sticky-top'
						style={{ alignSelf: "flex-start" }}
					></div>
					<div className='i-content'>{content}</div>
				</div>

				{footer}
			</div>
		);
	}
) as IContainer;

Container.Header = Header;
Container.Sider = Sider;
Container.Footer = Footer;

export default Container;
