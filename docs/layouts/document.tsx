import { Container, Loading } from "@p";
import { Suspense, lazy, memo } from "react";
import { useParams } from "react-router-dom";
const { Header, Sider, Footer } = Container;

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
		<Container breakpoint={880}>
			<Header>
				<h1>R</h1>
			</Header>
			<div className='pd-12'>
				<DynamicPage name={name}></DynamicPage>
			</div>
		</Container>
	);
}
