import { Link } from "react-router-dom";
import Demo from "./components/demo";
import { DBasic, DColor, DToggle } from "./components/props/button";

export default function button(): JSX.Element {
	return (
		<>
			<h3 className='mb-8'>示例</h3>

			<Demo source={DBasic} />

			<h3 className='mt-80 mb-8'>颜色</h3>
			<p>
				颜色选择参考
				<Link to='/docs/colors' className='blue'>
					页面
				</Link>
			</p>
			<Demo source={DColor} />

			<h3 className='mt-80 mb-8'>Toggle</h3>
			<Demo source={DToggle} />
		</>
	);
}
