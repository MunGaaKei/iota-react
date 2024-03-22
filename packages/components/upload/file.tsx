import { formatBytes } from "@p/js/utils";
import Helpericon from "../utils/helpericon";
import { IFileItem } from "./type";

export default function File(props: IFileItem) {
	const { file } = props;
	console.log(file);

	return (
		<div className='i-upload-item'>
			<span>{file?.name}</span>
			<i className='i-upload-size'>{formatBytes(file?.size ?? 0)}</i>
			<Helpericon active />
		</div>
	);
}
