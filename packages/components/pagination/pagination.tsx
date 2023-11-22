import {
	KeyboardArrowLeftRound,
	KeyboardArrowRightRound,
	MoreHorizRound,
} from "@ricons/material";
import classNames from "classnames";
import { useEffect, useMemo, useState } from "react";
import Icon from "../icon";
import Loading from "../loading";
import "./index.scss";
import { Props } from "./type";

const Page = (props: any) => {
	const { page, active, children, onChange } = props;
	const [loading, setLoading] = useState(false);

	const handleClick = async () => {
		if (active) return;

		setLoading(true);
		await onChange(page);
		setLoading(false);
	};

	return (
		<a
			className={classNames("i-page", {
				"i-page-active": active,
				"i-page-loading": loading,
			})}
			data-page={page}
			onClick={handleClick}
		>
			{loading && <Loading />}
			{children}
		</a>
	);
};

const Ellipsis = () => <Icon icon={<MoreHorizRound />} className='color-7' />;

const Pagination = (props: Props): JSX.Element => {
	const {
		page: defaultPage = 1,
		size = 5,
		total = 0,
		sibling = 2,
		prev = <Icon icon={<KeyboardArrowLeftRound />} />,
		next = <Icon icon={<KeyboardArrowRightRound />} />,
		className,
		onChange,
		...restProps
	} = props;

	const [page, setPage] = useState(defaultPage);

	const totalPage = useMemo(() => {
		return Math.ceil(total / size);
	}, [size, total]);

	const [start, end] = useMemo(() => {
		return [
			Math.max(1, page - sibling),
			Math.min(totalPage, page + sibling),
		];
	}, [page, totalPage, sibling]);

	if (totalPage <= page && page === 1) return <></>;

	const loop = Array.from({ length: end - start + 1 }).map(
		(n, i) => start + i
	);

	const handlePageChange = async (p: number) =>
		new Promise<void>(async (resolve) => {
			await onChange?.(p);
			setPage(p);
			resolve();
		});

	useEffect(() => {
		setPage(defaultPage);
	}, [defaultPage]);

	return (
		<div className={classNames("i-pagination", className)} {...restProps}>
			{prev && (
				<Page page={page - 1} onChange={handlePageChange}>
					{prev}
				</Page>
			)}

			{start > 1 && (
				<Page page={1} onChange={handlePageChange}>
					1
				</Page>
			)}

			{start > 2 && <Ellipsis />}

			{loop.map((p) => {
				return (
					<Page
						key={p}
						page={p}
						active={p === page}
						onChange={handlePageChange}
					>
						{p}
					</Page>
				);
			})}

			{end < totalPage - 1 && <Ellipsis />}

			{end < totalPage && (
				<Page page={totalPage} onChange={handlePageChange}>
					{totalPage}
				</Page>
			)}

			{next && (
				<Page page={page + 1} onChange={handlePageChange}>
					{next}
				</Page>
			)}
		</div>
	);
};

export default Pagination;
