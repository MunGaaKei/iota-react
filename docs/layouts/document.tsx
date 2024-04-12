import { GlobalContext } from "@d/config/context";
import menu from "@d/config/menu";
import { Area, Button, Flex, Icon, Loading, Tree } from "@p";
import { LightModeTwotone, NightlightTwotone } from "@ricons/material";
import { Suspense, lazy, memo, useContext } from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Link, useParams } from "react-router-dom";
import "./global.css";

interface DProps {
	name?: string;
}

const DynamicPage = memo(
	(props: DProps) => {
		const { name } = props;
		const Page = lazy(() => import(`../pages/${name}`));

		return (
			<Suspense fallback={<Loading />}>
				<Page />
			</Suspense>
		);
	},
	(p, n) => p.name === n.name
);

export default function Document(): JSX.Element {
	const { name } = useParams<{ [key: string]: string }>();
	const global = useContext(GlobalContext);

	return (
		<Area
			layout='goku'
			configs={{ headerHeight: "50px", contentWidth: "1200px" }}
		>
			<Area.Item name='header' className='px-8 hover-opacity'>
				<Area.Item name='inner' className='items-center'>
					<div className='flex flex-1'></div>
					<h2 className='mx-auto'>
						<Link to='/'>R</Link>
					</h2>
					<Flex className='flex-1' justify='end' gap={8}>
						<Button.Toggle
							square
							size='small'
							flat
							after={<Icon icon={<NightlightTwotone />} />}
							active={global.theme === "theme-dark"}
							onToggle={(v) =>
								global.setTheme(v ? "theme-dark" : "theme-none")
							}
						>
							<Icon icon={<LightModeTwotone />} />
						</Button.Toggle>
						<Button square size='small' flat>
							<Icon
								icon={
									<svg
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 32 32'
									>
										<path
											d='M16 2a14 14 0 0 0-4.43 27.28c.7.13 1-.3 1-.67v-2.38c-3.89.84-4.71-1.88-4.71-1.88a3.71 3.71 0 0 0-1.62-2.05c-1.27-.86.1-.85.1-.85a2.94 2.94 0 0 1 2.14 1.45a3 3 0 0 0 4.08 1.16a2.93 2.93 0 0 1 .88-1.87c-3.1-.36-6.37-1.56-6.37-6.92a5.4 5.4 0 0 1 1.44-3.76a5 5 0 0 1 .14-3.7s1.17-.38 3.85 1.43a13.3 13.3 0 0 1 7 0c2.67-1.81 3.84-1.43 3.84-1.43a5 5 0 0 1 .14 3.7a5.4 5.4 0 0 1 1.44 3.76c0 5.38-3.27 6.56-6.39 6.91a3.33 3.33 0 0 1 .95 2.59v3.84c0 .46.25.81 1 .67A14 14 0 0 0 16 2z'
											fillRule='evenodd'
											fill='currentColor'
										></path>
									</svg>
								}
							/>
						</Button>
					</Flex>
				</Area.Item>
			</Area.Item>

			<Area.Item name='inner'>
				<Area.Item name='sider' className='hover-opacity'>
					<Scrollbars
						autoHide
						autoHideTimeout={500}
						style={{ minWidth: 240 }}
					>
						<Tree
							items={menu}
							selected={`/docs/${name}`}
							keyProp='href'
							className='pd-8'
						/>
					</Scrollbars>
				</Area.Item>

				<div className='pd-8 flex-1 overflow-auto'>
					<DynamicPage name={name} />
				</div>
			</Area.Item>
		</Area>
	);
}
