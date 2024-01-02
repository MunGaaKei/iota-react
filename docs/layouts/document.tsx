import menus from "@d/config/menu";
import { Button, Container, Icon, Loading, Popup, Tree } from "@p";
import { MenuFilled, WbTwilightRound } from "@ricons/material";
import { Suspense, lazy, memo, useState } from "react";
import { useParams } from "react-router-dom";

interface DpProps {
	name?: string;
}

const DynamicPage = memo(
	({ name }: DpProps) => {
		const Page = lazy(() => import(`../pages/${name}`));

		return (
			<Suspense fallback={<Loading />}>
				<Page></Page>
			</Suspense>
		);
	},
	(pp: DpProps, np: DpProps) => pp.name === np.name
);

const Header = ({ onToggleSider }): JSX.Element => {
	return (
		<div className='py-8 px-12 flex gap-4'>
			<Button flat square onClick={() => onToggleSider()}>
				<Icon icon={<MenuFilled />}></Icon>
			</Button>
			<Button flat square>
				<Icon icon={<WbTwilightRound />}></Icon>
			</Button>
		</div>
	);
};

const Sider = (): JSX.Element => {
	return (
		<div className='px-12 text-center' style={{ minWidth: 240 }}>
			<h1 className='bg-blur sticky-top py-8'>
				<Popup
					offset={8}
					content={<h4 className='pd-12 bg-black'>IOTA REACT</h4>}
				>
					<span>R</span>
				</Popup>
			</h1>
			<Tree items={menus}></Tree>
		</div>
	);
};

const Footer = (): JSX.Element => {
	return <></>;
};

export default function Document(): JSX.Element {
	const { name } = useParams<{ [key: string]: string }>();
	const [collapsed, toggleCollapsed] = useState(true);

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
			drawer
			onToggle={(v) => toggleCollapsed(v || false)}
		>
			<div className='pd-12'>
				<DynamicPage name={name}></DynamicPage>
			</div>
		</Container>
	);
}
