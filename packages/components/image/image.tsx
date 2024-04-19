import { useIntersectionObserver } from "@p/js/hooks";
import { HideImageTwotone } from "@ricons/material";
import { useReactive } from "ahooks";
import classNames from "classnames";
import { useEffect, useRef } from "react";
import Icon from "../icon";
import Loading from "../loading";
import "./index.css";
import List from "./list";
import { IImage } from "./type";

const Image = (props: IImage): JSX.Element => {
	const {
		src,
		round,
		size,
		lazyload,
		fallback = (
			<Icon icon={<HideImageTwotone />} size='2em' className='color-5' />
		),
		fit,
		style,
		className,
		children,
		onLoad,
		onError,
		...rest
	} = props;

	const state = useReactive<{ status?: string }>({
		status: "loading",
	});
	const ref = useRef<HTMLImageElement>(null);
	const wh = fit ? "100%" : undefined;

	const { observe, unobserve } = useIntersectionObserver();

	const handleError = (err) => {
		onError?.(err);
		state.status = "error";
	};

	const handleLoad = (e) => {
		onLoad?.(e);
		state.status = undefined;
	};

	useEffect(() => {
		if (!src) return;

		state.status = "loading";

		if (!lazyload || !ref.current) return;

		observe(ref.current, (tar: HTMLElement, visible: boolean) => {
			if (!visible) return;

			tar.setAttribute("src", tar.dataset.src || "");
			unobserve(tar);
		});

		return () => {
			ref.current && unobserve(ref.current);
		};
	}, [src]);

	rest[lazyload ? "data-src" : "src"] = src;

	return (
		<div
			style={{
				width: size,
				height: size,
				...style,
			}}
			className={classNames("i-image", className, {
				rounded: round,
				[`i-image-${state.status}`]: state.status,
			})}
		>
			{state.status === "error" ? (
				fallback
			) : (
				<>
					{src && (
						<img
							ref={ref}
							style={{ objectFit: fit, width: wh, height: wh }}
							{...rest}
							onLoad={handleLoad}
							onError={handleError}
						/>
					)}

					{src && state.status === "loading" && <Loading />}

					{children && <div className='i-image-text'>{children}</div>}
				</>
			)}
		</div>
	);
};

Image.List = List;

export default Image;
