import { Icon, List } from "@p";
import { PersonRound } from "@ricons/material";

export default function Page() {
	return (
		<>
			<List style={{ height: 250 }}>
				{Array.from({ length: 10 }).map((n, i) => (
					<List.Item key={i}>
						<Icon icon={<PersonRound />} className='color-5' />
						<div>
							<p>user {i}</p>
							<span className='mt-4 color-7'>bio {i}</span>
						</div>
					</List.Item>
				))}
			</List>
		</>
	);
}
