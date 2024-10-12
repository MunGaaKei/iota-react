import { Flex } from "@p";
import { Link } from "react-router-dom";
import Api from "./components/api";
import Demo from "./components/demo";
import { DBasic, PDropdown, PDropdownItem } from "./components/props/dropdown";

export default function Page() {
	return (
		<>
			<h2 className='mb-40'>Dropdown</h2>
			<h3 className='mb-12'>示例</h3>
			<Demo source={DBasic} />

			<h3 className='mt-80 mb-20'>Api 参考</h3>
			<h4 className='mb-12'>
				<Flex gap={12}>
					<span className='blue'>Dropdown</span>

					<span className='color-5'>extends</span>
					<Link to='/docs/popup#api' className='blue'>
						Popup
					</Link>
				</Flex>
			</h4>
			<Api apis={PDropdown} />

			<h4 className='mt-40 mb-20 blue'>
				<span className='opacity-5'>Dropdown.</span>Item
			</h4>
			<Api apis={PDropdownItem} />
		</>
	);
}
