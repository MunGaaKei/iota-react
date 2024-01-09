import { Affix, Button, Icon } from "@p";
import { MicTwotone } from "@ricons/material";

export default function Page() {
	return (
		<>
			<div style={{ height: 2000 }}>
				<h4>滚动页面</h4>
			</div>

			<Affix
				bottom={20}
				right={20}
				offset={400}
				getContainer={() => document.querySelector(".i-area-content")}
			>
				<Affix.ToTop className='bg-black-0' />

				<Button square className='bg-black-0'>
					<Icon icon={<MicTwotone />} />
				</Button>
			</Affix>
		</>
	);
}
