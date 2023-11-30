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
		if (active || loading) return;

		setLoading(true);
		await onChange(page);
		setLoading(false);
	};

	return (
		<a
			className={classNames("i-page", {
				"i-page-active": active,
				"i-page-loading": loading,
				"i-page-disabled": false,
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
		simple,
		jumper,
		className,
		onChange,
		...restProps
	} = props;

	const [page, setPage] = useState(defaultPage);
	const [loading, setLoading] = useState(false);

	const totalPage = useMemo(() => Math.ceil(total / size), [size, total]);

	const [start, end, loop] = useMemo(() => {
		const start = Math.max(1, page - sibling);
		const end = Math.min(totalPage, page + sibling);

		return [
			start,
			end,
			Array.from({ length: end - start + 1 }).map((n, i) => start + i),
		];
	}, [page, totalPage, sibling]);

	if (totalPage <= page && page === 1) return <></>;

	const handlePageChange = async (p: number) => {
		if (!onChange || loading) return;
		setLoading(true);

		return new Promise<void>(async (resolve) => {
			await onChange(p);
			setPage(p);
			setLoading(false);
			resolve();
		});
	};

	useEffect(() => setPage(defaultPage), [defaultPage]);

	return (
		<div className={classNames("i-pagination", className)} {...restProps}>
			{prev && (
				<Page page={page - 1 || 1} onChange={handlePageChange}>
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
