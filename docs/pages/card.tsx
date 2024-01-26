import pain from "@d/assets/pain.jpg";
import sasuke from "@d/assets/sasuke.jpg";
import { Button, Card, Flex, Icon, Image, Text } from "@p";
import { CloseRound, FavoriteTwotone, MoreVertRound } from "@ricons/material";

export default function Page() {
	return (
		<>
			<Flex columns='repeat(auto-fill, minmax(180px, 1fr))' gap='20px'>
				<Card>
					<Card.Banner>
						<Image src={sasuke} />
					</Card.Banner>
					<Card.Header className='items-center'>
						<h4>UCHIHA SASUKE</h4>
						<Button size='small' square flat className='ml-auto'>
							<Icon icon={<MoreVertRound />} />
						</Button>
					</Card.Header>
					SHIDORI
				</Card>
				<Card>
					<Card.Header>
						<Flex gap={8} align='center'>
							<a>
								<Image className='bg-red' size={32} round />
							</a>
							<div>
								<h4>PAIN</h4>
								<Text className='color-6' size={12}>
									DAWN
								</Text>
							</div>
						</Flex>
						<Button size='small' square flat className='ml-auto'>
							<Icon icon={<FavoriteTwotone />} />
						</Button>
						<Button size='small' square flat>
							<Icon icon={<CloseRound />} />
						</Button>
					</Card.Header>
					<Image src={pain} />
					<Card.Footer>
						<Button className='bg-red-0'>地爆天星</Button>
					</Card.Footer>
				</Card>
			</Flex>
		</>
	);
}
