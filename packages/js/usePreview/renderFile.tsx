import Icon from "@p/components/icon";
import { FeedOutlined } from "@ricons/material";
import { TPreviewItem } from "./type";

export default function renderFile(props: TPreviewItem) {
	const { suffix } = props;

	return (
		<div className='i-preview-unknown'>
			<Icon icon={<FeedOutlined />} size='3em' />
			<h5 className='mt-4'>.{suffix}</h5>
		</div>
	);
}
