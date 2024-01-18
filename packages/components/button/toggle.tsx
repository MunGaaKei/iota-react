import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import { MouseEvent, useEffect } from "react";
import Button from "./button";
import { IButtonToggle } from "./type";

export default function Toggle(props: IButtonToggle) {
	const {
		active,
		activeClass,
		after = "😒",
		disabled,
		children,
		className,
		onClick,
		onToggle,
		...restProps
	} = props;

	const state = useReactive({
		active,
		done: true,
	});

	const toggle = useMemoizedFn(() => {
		Object.assign(state, {
			active: !state.active,
			done: false,
		});
		onToggle?.(state.active);

		setTimeout(() => {
			state.done = true;
		}, 16);
	});

	const handleClick = (e: MouseEvent<HTMLElement>) => {
		onClick?.(e);

		!disabled && toggle();
	};

	useEffect(() => {
		state.active !== active && toggle();
	}, [active]);

	return (
		<Button
			className={classNames(className, "i-btn-toggle")}
			{...restProps}
			onClick={handleClick}
		>
			<div
				className={classNames("i-btn-toggle-content", {
					"i-btn-toggle-active": state.done,
				})}
			>
				{state.active ? after : children}
			</div>
		</Button>
	);
}
