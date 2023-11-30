import { Button, Dropdown, Icon } from "@p";
import { ArrowDropDownRound } from "@ricons/material";

export default function Page() {
	return (
		<>
			<Dropdown visible list={[]}>
				<Button>
					国家 <Icon icon={<ArrowDropDownRound />} />
				</Button>
			</Dropdown>
		</>
	);
}
