import { Affix, Button, Icon } from "@p";
import { MicTwotone } from "@ricons/material";
import { useRef } from "react";

export default function Page() {
	const ref = useRef(null);

	return (
		<>
			<div style={{ height: 2000 }}>
				<h4>滚动页面</h4>
			</div>

			<Affix
				bottom={20}
				right={20}
				offset={400}
				getContainer={() => document.querySelector(".i-content")}
			>
				<Affix.ToTop className='bg-black-0' />

				<Button square className='bg-black-0'>
					<Icon icon={<MicTwotone />} />
				</Button>
			</Affix>
		</>
	);
}