import { useClickOutside } from "@p/js/hooks";
import { getPosition } from "@p/js/utils";
import { useCreation, useReactive } from "ahooks";
import classNames from "classnames";
import {
	CSSProperties,
	Children,
	ReactNode,
	cloneElement,
	forwardRef,
	isValidElement,
	useCallback,
	useLayoutEffect,
	useMemo,
	useRef,
} from "react";
import { createPortal } from "react-dom";
import "./index.scss";
import { Props } from "./type";

type Tsto = ReturnType<typeof setTimeout>;

type PropsContent = { style?: CSSProperties; children?: ReactNode } & Pick<
	Props,
	"getContainer"
>;

const Content = forwardRef<HTMLDivElement, PropsContent>((props, ref) => {
	const { getContainer = () => document.body, children, ...rest } = props;

	const content = (
		<div ref={ref} className='i-popup' {...rest}>
			{children}
		</div>
	);

	return createPortal(content, getContainer());
});

export default function Popup(props: Props) {
	const {
		visible = false,
		content,
		trigger = "hover",
		gap = 12,
		offset = 0,
		fixed,
		position,
		showDelay = 16,
		hideDelay = 60,
		touchable,
		fitWidth,
		getContainer,
		children,
		onVisibleChange,
	} = props;

	const triggerRef = useRef<HTMLElement>(null);
	const contentRef = useRef<HTMLDivElement>(null);
	const state = useReactive<{
		show: boolean;
		toggling: Tsto | boolean;
		style: CSSProperties;
	}>({
		show: false,
		toggling: false,
		style: { position: fixed ? "fixed" : "absolute" },
	});

	useClickOutside(
		contentRef.current,
		() => handleToggle(false),
		trigger !== "click"
	);

	const handleShow = useCallback(() => {
		if (state.show) return;
		state.show = true;

		state.toggling = setTimeout(() => {
			const [left, top] = getPosition(
				triggerRef.current?.closest(".i-popup-trigger"),
				contentRef.current,
				{
					position,
					gap,
					offset,
				}
			);

			state.style = {
				...state.style,
				opacity: 1,
				left,
				top,
			};
			state.toggling && clearTimeout(state.toggling as Tsto);
			onVisibleChange?.(true);
		}, showDelay);
	}, [state.show]);

	const handleHide = useCallback(() => {
		if (!state.show) return;
		state.toggling = setTimeout(() => {
			state.style = {
				...state.style,
				opacity: 0,
			};

			setTimeout(() => {
				state.show = false;
				state.toggling && clearTimeout(state.toggling as Tsto);
				onVisibleChange?.(false);
			}, 160);
		}, hideDelay);
	}, []);

	const handleToggle = useCallback(
		(action?: boolean) => {
			state.toggling && clearTimeout(state.toggling as Tsto);

			if (action !== undefined) {
				action ? handleShow() : handleHide();
				return;
			}

			state.show ? handleHide() : handleShow();
		},
		[state.show]
	);

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

	useLayoutEffect(() => {
		if (!fitWidth || !state.show) return;
		const width = (
			triggerRef.current?.closest(".i-popup-trigger") as HTMLElement
		)?.offsetWidth;
		state.style = { ...state.style, width };
	}, [state.show]);

	useLayoutEffect(() => {
		handleToggle(visible);
	}, [visible]);

	return (
		<>
			{Children.map(children, (child) => {
				if (!isValidElement(child)) return;

				const { type, props } = child;

				if (typeof type === "function") return child;

				const { className: inheritClass, ...rest } = props;
				const className = classNames(inheritClass, "i-popup-trigger");

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
					style={state.style}
					{...contentTouch}
					getContainer={getContainer}
				>
					{content}
				</Content>
			)}
		</>
	);
}
