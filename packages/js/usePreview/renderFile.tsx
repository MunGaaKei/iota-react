import Icon from "@p/components/icon";
import Image from "@p/components/image";
import Video from "@p/components/video";
import { FeedOutlined } from "@ricons/material";
import { TFileType, TPreviewItem } from "./type";

export default function renderFile(props: TPreviewItem) {
	const { suffix, type } = props;

	switch (type) {
		case TFileType.IMAGE:
			return <Image {...props} lazyload />;
		case TFileType.VIDEO:
			return <Video {...props} />;
		default:
			return (
				<div className='i-preview-unknown'>
					<Icon icon={<FeedOutlined />} size='3em' />
					<h5 className='mt-4'>.{suffix}</h5>
				</div>
			);
	}
}
