import { formatBytes } from "@p/js/utils";
import Image from "../image";
import Popup from "../popup";
import Helpericon from "../utils/helpericon";
import { IUploadItem } from "./type";

export default function RenderFile(props: IUploadItem) {
	const { mode, index, file, onRemove } = props;

	if (!file) return <></>;
	const { name, size, url, src } = file;

	switch (mode) {
		case "card":
			return (
				<Popup content={<div className='pd-8'>{name}</div>} offset={8}>
					<div className='i-upload-item-card'>
						<Image lazyload src={url || src} />
						<Helpericon
							active
							className='red'
							onClick={(e) => {
								e.stopPropagation();
								e.preventDefault();
								onRemove(index);
							}}
						/>
					</div>
				</Popup>
			);
		default:
			return (
				<div className='i-upload-item'>
					<span>{name}</span>

					<i className='i-upload-size'>{formatBytes(size ?? 0)}</i>

					<Helpericon active onClick={() => onRemove(index)} />
				</div>
			);
	}
}
