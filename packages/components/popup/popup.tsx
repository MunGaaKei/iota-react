import { useResizeObserver } from "@p/js/hooks";
import { getPointPosition, getPosition } from "@p/js/utils";
import { useClickAway, useCreation, useReactive } from "ahooks";
import {
	CSSProperties,
	Children,
	MouseEvent,
	cloneElement,
	isValidElement,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
} from "react";
import Content from "./content";
import "./index.css";
import { IPopup } from "./type";

export default function Popup(props: IPopup) {
	const {
		visible = false,
		content,
		trigger = "hover",
		gap = 12,
		offset = 0,
		fixed,
		position = "top",
		showDelay = 16,
		hideDelay = 12,
		touchable,
		arrow = true,
		align,
		fitSize,
		watchResize,
		clickoutside = true,
		disabled,
		style,
		className,
		getContainer,
		children,
		onVisibleChange,
	} = props;

	const triggerRef = useRef<HTMLElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const state = useReactive<{
		show: boolean;
		toggling: any;
		style: CSSProperties;
		arrowProps: Record<string, any>;
	}>({
		show: false,
		toggling: false,
		style: { position: fixed ? "fixed" : "absolute" },
		arrowProps: {},
	});

	useClickAway((e: Event) => {
		if (!clickoutside) return;

		const tar = e.target as HTMLElement;
		const isContain = triggerRef.current?.contains(tar);

		if (!state.show) return;

		(!isContain || trigger === "contextmenu") && handleToggle(false);
	}, contentRef);

	const handleShow = () => {
		if (disabled) return;
		if (state.show) {
			if (trigger !== "hover" || (trigger === "hover" && !touchable)) {
				return;
			}
		}

		state.show = true;

		state.toggling && clearTimeout(state.toggling);
		state.toggling = setTimeout(() => {
			const [left, top, { arrowX, arrowY, arrowPos }] = getPosition(
				triggerRef.current,
				contentRef.current,
				{
					position,
					gap,
					offset,
					align,
				}
			);

			state.style = {
				...state.style,
				opacity: 1,
				transform: "none",
				left,
				top,
			};
			state.arrowProps = {
				left: arrowX,
				top: arrowY,
				pos: arrowPos,
			};
			state.toggling && clearTimeout(state.toggling);
			onVisibleChange?.(true);
		}, showDelay);
	};

	const handleHide = () => {
		if (!state.show) return;
		state.toggling = setTimeout(() => {
			state.style = {
				...state.style,
				opacity: 0,
				transform: "translate(0, 2px)",
			};

			setTimeout(() => {
				state.show = false;
				state.toggling && clearTimeout(state.toggling);
				onVisibleChange?.(false);
			}, 160);
		}, hideDelay);
	};

	const handleToggle = (action?: boolean) => {
		if (action !== undefined) {
			action ? handleShow() : handleHide();
			return;
		}

		state.show ? handleHide() : handleShow();
	};
	const eventMaps = useCreation(
		() => ({
			click: {
				onClick: () => handleToggle(true),
			},
			hover: {
				onMouseEnter: () => handleToggle(true),
				onMouseLeave: () => handleToggle(false),
			},
			focus: {
				onFocus: () => handleToggle(true),
				onBlur: () => handleToggle(false),
			},
			contextmenu: {
				onContextMenu: (e: MouseEvent) => {
					e.preventDefault();
					e.stopPropagation();

					if (state.show) {
						const [left, top] = getPointPosition(
							e,
							contentRef.current as HTMLElement
						);
						state.style = {
							...state.style,
							left,
							top,
						};

						return;
					}

					state.show = true;

					state.toggling = setTimeout(() => {
						const [left, top] = getPointPosition(
							e,
							contentRef.current as HTMLElement
						);

						state.style = {
							...state.style,
							opacity: 1,
							transform: "none",
							left,
							top,
						};

						state.toggling && clearTimeout(state.toggling);
						onVisibleChange?.(true);
					}, showDelay);
				},
			},
			none: {},
		}),
		[]
	);

	const contentTouch = useMemo(() => {
		if (!touchable) return {};
		const events: { [key: string]: () => void } = {};

		if (trigger === "hover") {
			events["onMouseEnter"] = () => handleToggle(true);
			events["onMouseLeave"] = () => handleToggle(false);
		}

		return events;
	}, [touchable, trigger]);

	const computePosition = () => {
		if (!state.show) return;

		const [left, top, { arrowX, arrowY, arrowPos }] = getPosition(
			triggerRef.current,
			contentRef.current,
			{
				position,
				gap,
				offset,
				align,
			}
		);

		Object.assign(state, {
			style: { ...state.style, left, top },
			arrowProps: { left: arrowX, top: arrowY, pos: arrowPos },
		});
	};

	useEffect(() => {
		if (trigger === "contextmenu") return;
		const { observe, unobserve, disconnect } = useResizeObserver();

		triggerRef.current && observe(triggerRef.current, computePosition);

		if (!watchResize || !contentRef.current) return;

		observe(contentRef.current, computePosition);

		return () => {
			if (!watchResize || !contentRef.current) return;

			unobserve(contentRef.current);
			triggerRef.current && unobserve(triggerRef.current);
			disconnect();
		};
	}, [watchResize, contentRef.current, triggerRef.current]);

	useLayoutEffect(() => {
		if (!fitSize || !state.show) return;

		const vertical = ["top", "bottom"].includes(position);
		const size =
			triggerRef.current?.[vertical ? "offsetWidth" : "offsetHeight"];
		state.style = { ...state.style, [vertical ? "width" : "height"]: size };
	}, [state.show, fitSize]);

	useLayoutEffect(() => {
		handleToggle(visible);
	}, [visible]);

	return (
		<>
			{Children.map(children, (child) => {
				if (!isValidElement(child)) return;

				const { type, props } = child;

				if (typeof type === "function") return child;

				const { className, ...rest } = props;

				return cloneElement(child, {
					ref: triggerRef,
					className,
					...eventMaps[trigger],
					...rest,
				});
			})}

			{state.show && (
				<Content
					ref={contentRef}
					arrow={arrow && trigger !== "contextmenu"}
					style={{ ...style, ...state.style }}
					arrowProps={state.arrowProps}
					className={className}
					{...contentTouch}
					getContainer={getContainer}
				>
					{content}
				</Content>
			)}
		</>
	);
}
