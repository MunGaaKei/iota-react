import Api from "./components/api";
import Demo from "./components/demo";
import { DBasic, PImage } from "./components/props/image";

export default function Page() {
	return (
		<>
			<h2 className='mb-40'>Image</h2>
			<h3 className='mb-12'>示例</h3>
			<Demo source={DBasic} />

			{/* <h3 className='mt-80 mb-20'>
				<span className='color-5'>Image.</span>List
			</h3>
			<Demo source={DImageList} /> */}

			<h3 className='mt-80 mb-20'>Api 参考</h3>
			<Api apis={PImage} />
		</>
	);
}
