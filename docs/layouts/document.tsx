import menus from "@d/config/menu";
import { Button, Container, Icon, Menu } from "@p/index";
import { MenuFilled } from "@ricons/material";
import { Suspense, lazy, memo, useState } from "react";
import { useParams } from "react-router-dom";

interface DpProps {
	name?: string;
}

const DynamicPage = memo(
	({ name }: DpProps) => {
		const Page = lazy(() => import(`../pages/${name}`));

		return (
			<Suspense fallback={<>loading</>}>
				<Page></Page>
			</Suspense>
		);
	},
	(pp: DpProps, np: DpProps) => pp.name === np.name
);

const Header = ({
	onToggleSider,
}: {
	onToggleSider: Function;
}): JSX.Element => {
	return (
		<div className='py-8 px-12 flex'>
			<Button flat square onClick={() => onToggleSider()}>
				<Icon icon={MenuFilled}></Icon>
			</Button>
		</div>
	);
};

const Sider = (): JSX.Element => {
	return (
		<div className='px-4 py-12'>
			<h1>R</h1>
			<Menu items={menus}></Menu>
		</div>
	);
};

const Footer = (): JSX.Element => {
	return <></>;
};

export default function Document(): JSX.Element {
	const { name } = useParams<{ [key: string]: string }>();
	const [collapsed, toggleCollapsed] = useState<boolean>(true);

	return (
		<Container
			layout='menu'
			collapsed={collapsed}
			breakpoint={880}
			header={
				<Header onToggleSider={() => toggleCollapsed(!collapsed)} />
			}
			sider={<Sider />}
			footer={<Footer />}
		>
			<div className='pd-12'>
				<DynamicPage name={name}></DynamicPage>
			</div>
		</Container>
	);
}
