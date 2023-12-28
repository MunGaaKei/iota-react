import pain from "@d/assets/pain.jpg";
import sasuke from "@d/assets/sasuke.jpg";
import { Button, Card, Flex, Icon, Image } from "@p";
import { CloseRound, FavoriteTwotone, MoreVertRound } from "@ricons/material";

export default function Page() {
	return (
		<>
			<Flex
				columns='repeat(auto-fill, minmax(200px, 1fr))'
				gap='20px'
				align='flex-start'
			>
				<Card>
					<Card.Header>
						<h4>UCHIHA SASUKE</h4>
						<Button size='small' square flat className='ml-auto'>
							<Icon icon={<MoreVertRound />} />
						</Button>
					</Card.Header>
					SHIDORI
					<Card.Banner>
						<Image src={sasuke} />
					</Card.Banner>
				</Card>
				<Card>
					<Card.Header>
						<h4>PAIN</h4>
						<Button size='small' square flat className='ml-auto'>
							<Icon icon={<FavoriteTwotone />} />
						</Button>
						<Button size='small' square flat>
							<Icon icon={<CloseRound />} />
						</Button>
					</Card.Header>
					<Image src={pain} />
					<Card.Footer>
						<Button className='bg-brown-0'>地爆天星</Button>
					</Card.Footer>
				</Card>
			</Flex>
		</>
	);
}
