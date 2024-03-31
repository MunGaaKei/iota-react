import { formatBytes } from "@p/js/utils";
import Image from "../image";
import Popup from "../popup";
import Helpericon from "../utils/helpericon";
import { IUploadItem } from "./type";

export default function RenderFile(props: IUploadItem) {
	const { mode, index, file, onRemove, onPreview } = props;

	if (!file) return <></>;
	const { name, size, url, src } = file;

	const CloseBtn = (
		<Helpericon
			active
			onClick={(e) => {
				e.stopPropagation();
				e.preventDefault();
				onRemove(index);
			}}
		/>
	);

	switch (mode) {
		case "card":
			return (
				<Popup content={<div className='pd-8'>{name}</div>} offset={8}>
					<div
						className='i-upload-item-card'
						onClick={() => onPreview?.(index)}
					>
						<Image lazyload src={url || src} fit='cover' />

						{CloseBtn}
					</div>
				</Popup>
			);
		default:
			return (
				<div
					className='i-upload-item'
					onClick={() => onPreview?.(index)}
				>
					<span>{name}</span>

					<i className='i-upload-size'>{formatBytes(size ?? 0)}</i>

					{CloseBtn}
				</div>
			);
	}
}
