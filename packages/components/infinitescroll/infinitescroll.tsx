import classNames from "classnames";
import { createRef, forwardRef, useEffect, useRef } from "react";
import "./index.scss";
import type { IInfiniteScroll } from "./type";

const InfiniteScroll = forwardRef<HTMLDivElement, IInfiniteScroll>(
	(props, ref) => {
		const {
			hasPrev,
			hasNext,
			initialOffset = 30,
			style,
			className,
			children,
			onLoadMore,
		} = props;
		const IO = useRef<IntersectionObserver>();
		const $prev = createRef<HTMLDivElement>();
		const $next = createRef<HTMLDivElement>();

		useEffect(() => {
			IO.current = new IntersectionObserver((entries) => {
				entries.map((entry) => {
					if (!entry.isIntersecting || !onLoadMore) return;

					const { target } = entry;
					const isNext = target.classList.contains(
						"i-infinite-scroll-next"
					);
					onLoadMore(isNext);

					!isNext &&
						((ref as any)?.current as HTMLDivElement)?.scrollTo({
							top: initialOffset,
						});
				});
			});

			IO.current.observe($prev.current as HTMLDivElement);
			IO.current.observe($next.current as HTMLDivElement);

			return () => {
				IO.current?.disconnect();
				IO.current = undefined;
			};
		}, [children]);

		return (
			<div
				ref={ref}
				className={classNames("i-infinite-scroll", className)}
				style={style}
			>
				{hasPrev && (
					<div ref={$prev} className='i-infinite-scroll-prev'></div>
				)}

				{children}

				{hasNext && (
					<div ref={$next} className='i-infinite-scroll-next'></div>
				)}
			</div>
		);
	}
);

export default InfiniteScroll;
