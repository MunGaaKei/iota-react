import { RButton } from '@p/index';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function button(): JSX.Element {
	const [loading, setLoading] = useState<boolean>(false);

	return (
		<>
			<RButton
				disabled
				onClick={() => setLoading(!loading)}
				loading={loading}
			>
				BUTTON
			</RButton>
			<Link to="/">link</Link>
		</>
	);
}
