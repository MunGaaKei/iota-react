import { Checkbox } from "@p";

export default function Page() {
	return (
		<>
			<Checkbox options={[1, 2, 3]}></Checkbox>
			<br />
			<Checkbox.Item partof>部分选择</Checkbox.Item>
		</>
	);
}
