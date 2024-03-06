import { Collapse } from "@p";

export default function Page(params) {
	return (
		<>
			<Collapse>
				<Collapse.Item title={<>窗外的麻雀</>}>
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Ducimus doloremque, nulla eos et sapiente consequuntur
					aliquam ipsam architecto sit? Quia ducimus laboriosam atque
					distinctio voluptatibus sit et cum iste incidunt.
				</Collapse.Item>
				<Collapse.Item title='在电线杆上多嘴' disabled>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit.
					Quibusdam dicta quas minima quaerat, minus cupiditate sequi
					aliquam provident reiciendis odit, aliquid adipisci itaque
					ullam ab corrupti saepe veritatis nulla pariatur!
				</Collapse.Item>
				<Collapse.Item title='夏天的味道'>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et
					aspernatur, incidunt, sequi, ab cum quis voluptas dolorem
					vel dolor unde accusamus qui ratione nesciunt velit optio
					amet! Temporibus, nesciunt nihil!
				</Collapse.Item>
			</Collapse>
		</>
	);
}
