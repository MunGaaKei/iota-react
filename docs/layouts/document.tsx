import { Area, Loading } from "@p";
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
				<Page></Page>
			</Suspense>
		);
	},
	(p: DProps, n: DProps) => p.name === n.name
);

export default function Document(): JSX.Element {
	const { name } = useParams<{ [key: string]: string }>();

	return (
		<Area>
			{/* <Area.Item name='header' className='px-12'>
				<h2>R</h2>
			</Area.Item>
			<Area.Item name='sider' className='pd-12'>
				<Tree items={menu} style={{ minWidth: 240 }} />
			</Area.Item> */}
			<Area.Item>
				<div className='pd-12'>
					<DynamicPage name={name}></DynamicPage>
				</div>
			</Area.Item>
		</Area>
	);
}
