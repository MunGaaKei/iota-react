import { Button, Flex, Icon, Popup } from "@p";
import { LinkRound } from "@ricons/material";
import { Link } from "react-router-dom";
import Api from "./components/api";
import Demo from "./components/demo";
import {
	DBasic,
	DColor,
	DToggle,
	PButton,
	PButtonToggle,
} from "./components/props/button";

export default function button(): JSX.Element {
	return (
		<>
			<h2 className='mb-40'>Button</h2>
			<h3 className='mb-20'>示例</h3>
			<Demo source={DBasic} />

			<h3 className='mt-80 mb-4'>颜色</h3>
			<p className='color-5 mb-12'>
				颜色选择参考
				<Link to='/docs/colors' className='blue'>
					页面
				</Link>
			</p>
			<Demo source={DColor} />

			<Flex className='mt-80 mb-20' gap={8}>
				<h3>
					<span className='color-5'>Button.</span>Toggle
				</h3>
				<Popup content='Api' className='bg-black pd-8'>
					<Button flat square size='small' href='#button-toggle'>
						<Icon icon={<LinkRound />} />
					</Button>
				</Popup>
			</Flex>
			<Demo source={DToggle} inline />

			<h3 className='mt-80 mb-20'>Api 参考</h3>

			<h4 id='button' className='mb-20'>
				Button
			</h4>
			<Api apis={PButton} className='mb-80' />

			<h4 id='button-toggle' className='mb-20'>
				<Flex gap={12}>
					<span>
						<span className='color-5'>Button.</span>Toggle
					</span>

					<span className='yellow'>extends</span>
					<a href='#button'>Button</a>
				</Flex>
			</h4>
			<Api apis={PButtonToggle} className='mb-80' />
		</>
	);
}
