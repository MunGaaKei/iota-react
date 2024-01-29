import menu from "@d/config/menu";
import { Area, Loading, Tree } from "@p";
import { Suspense, lazy, memo } from "react";
import { useParams } from "react-router-dom";

interface DProps {
	name?: string;
}

const DynamicPage = memo(
	({ name }: DProps) => {
		const Page = lazy(() => import(`../pages/${name}`));

		return (
			<Suspense fallback={<Loading />}>
				<Page />
			</Suspense>
		);
	},
	(p: DProps, n: DProps) => p.name === n.name
);

export default function Document(): JSX.Element {
	const { name } = useParams<{ [key: string]: string }>();

	return (
		<Area
			layout='naruto'
			configs={{ headerHeight: "50px", contentWidth: "1000px" }}
		>
			<Area.Item name='header' className='px-8'>
				<h2>R</h2>
			</Area.Item>

			<Area.Item name='sider' className='pd-8'>
				<Tree
					items={menu}
					selected={`/docs/${name}`}
					keyProp='href'
					style={{ minWidth: 240 }}
				/>
			</Area.Item>

			<Area.Item name='content' className='pd-8'>
				<DynamicPage name={name}></DynamicPage>
			</Area.Item>
		</Area>
	);
}
