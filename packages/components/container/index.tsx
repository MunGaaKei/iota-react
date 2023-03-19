import { ReactNode } from 'react';
import './container.scss';

export type TypeProps = {
	layout?: 'default' | 'menu';
	sider?: ReactNode;
	header?: ReactNode;
	footer?: ReactNode;
	children?: ReactNode;
};

const Container = ({
	layout = 'default',
	header: Header,
	sider: Sider,
	footer: Footer,
	children
}: TypeProps): JSX.Element => {
	return (
		<div className="r-container">
			{layout === 'default' ? (
				<>
					{Header && (
						<header className="r-header sticky bg-blur">{Header}</header>
					)}
					<div className="flex">
						{Sider && <div className="r-sider">{Sider}</div>}
						<div className="r-content">
							{children}
							{Footer && <footer className="r-footer">{Footer}</footer>}
						</div>
					</div>
				</>
			) : (
				<></>
			)}
		</div>
	);
};

export default Container;
