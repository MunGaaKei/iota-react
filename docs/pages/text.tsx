import { Text } from "@p";

export default function Page() {
	return (
		<>
			<Text weight={600} gradient={["left", "yellow", "crimson"]}>
				GRADIENT TEXT
			</Text>
			<br />
			{/* <Text>
				sdjflkj slkdfjlksdjf lksdjf lksdjf l;sadjfl;sdka f
				<span className='mark'>123321</span>
			</Text> */}
			<Text.Number count={0} to={10000} size={40} weight='600' />
			<br />
			<Text.Number count={152323000.24444} decimal={4} />
			<br />
			<Text.Time time={500} />
		</>
	);
}
