import { useSize } from "ahooks";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import { IAreaItem } from "./type";

function Item(props: IAreaItem) {
	const { name = "content", style, className, children } = props;
	const ref = useRef<HTMLDivElement>(null);
	const size = useSize(ref);

	useEffect(() => {
		if (!size) return;
		const { height } = size;
		const container = ref.current?.closest(".i-area") as HTMLDivElement;

		if (name === "header") {
			if (!container) return;
			container.style.setProperty("--header-height", `${height}px`);
		}

		container.style.setProperty(
			"--container-height",
			`${container.offsetHeight}px`
		);
	}, [name, size]);

	return (
		<div
			ref={ref}
			className={classNames(`i-area-${name}`, className)}
			style={{ gridArea: name, ...style }}
		>
			{children}
		</div>
	);
}

export default Item;
