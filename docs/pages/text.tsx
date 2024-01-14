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
			<Text.Number count={0} to={1000} size={40} weight='600' />
			<br />
			<Text.Time time={500} />
		</>
	);
}
