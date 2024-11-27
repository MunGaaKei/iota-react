import CodeView from "./components/code";
import { Cimport, PInstall } from "./components/props/install";

export default function Page() {
	return (
		<>
			<h2 className='mb-40'>Install</h2>
			<CodeView lang='npm'>{PInstall}</CodeView>

			<h3 className='mt-40 mb-20'>引入</h3>
			<CodeView lang='javascript'>{Cimport}</CodeView>
		</>
	);
}
