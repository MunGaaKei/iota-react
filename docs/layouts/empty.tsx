import { FC } from 'react';
import { Link } from 'react-router-dom';

export default function Empty<FC>(): JSX.Element {
	return (
		<>
			<Link to="/components/button">button</Link>
		</>
	);
}
