import { Button, Icon, Image } from "@p";
import { getFileTypeBySuffix, getSuffixByUrl } from "@p/js/utils";
import {
	CloseRound,
	FileDownloadOutlined,
	KeyboardArrowLeftRound,
	KeyboardArrowRightRound,
	OpenInNewRound,
	RotateLeftRound,
	RotateRightRound,
} from "@ricons/material";
import { useReactive } from "ahooks";
import { useMemo } from "react";
import DefaultRenderFile from "./renderFile";
import { IPreview, TFileType, TPreviewItem } from "./type";

export default function Content(props: IPreview) {
	const {
		items = [],
		initial = 0,
		renderImage,
		renderFile = DefaultRenderFile,
		onRotate,
		onChange,
		onClose,
	} = props;
	const state = useReactive({
		current: initial,
		rotate: 0,
	});

	const files = useMemo(
		() =>
			items.map((item) => {
				const o: TPreviewItem = {
					src: "",
				};
				if (typeof item === "string") {
					o.src = item;
				} else {
					Object.assign(o, item);
				}

				o.suffix = getSuffixByUrl(o.src) || "";
				o.type = getFileTypeBySuffix(o.suffix);

				return o;
			}),
		[items]
	);

	const { file, content } = useMemo(() => {
		const file = files[state.current];
		const { type } = file;
		let content = renderFile(file);

		switch (type) {
			case TFileType.IMAGE:
				content = renderImage?.(file) ?? <Image {...file} lazyload />;
				break;
			default:
				break;
		}

		return {
			file,
			content,
		};
	}, [state.current, items]);

	const handleSwitch = (next: number) => {
		const l = files.length;
		const { current: before } = state;
		if (next >= l) {
			state.current = 0;
		} else if (next < 0) {
			state.current = l - 1;
		} else {
			state.current = next;
		}
		onChange?.(state.current, before);

		state.rotate = files[state.current].rotate || 0;
		onRotate?.(state.rotate);
	};

	const handleRotate = (deg: number) => {
		state.rotate += deg;
		onRotate?.(state.rotate);
	};

	return (
		<>
			<div
				className='i-preview-content'
				style={{ transform: `rotate(${state.rotate}deg)` }}
			>
				{content}
			</div>

			<div className='i-preview-controls'>
				<Button square flat onClick={onClose}>
					<Icon icon={<CloseRound />} />
				</Button>
				<span className='px-8'>
					{state.current + 1} / {files.length}
				</span>
				<Button square flat href={file.src} target='_blank'>
					<Icon icon={<OpenInNewRound />} />
				</Button>
				<Button square flat href={file.src} download target='_blank'>
					<Icon icon={<FileDownloadOutlined />} />
				</Button>
				<Button square flat onClick={() => handleRotate(90)}>
					<Icon icon={<RotateRightRound />} />
				</Button>
				<Button square flat onClick={() => handleRotate(-90)}>
					<Icon icon={<RotateLeftRound />} />
				</Button>
				<Button
					square
					flat
					onClick={() => handleSwitch(state.current - 1)}
				>
					<Icon icon={<KeyboardArrowLeftRound />} />
				</Button>
				<Button
					square
					flat
					onClick={() => handleSwitch(state.current + 1)}
				>
					<Icon icon={<KeyboardArrowRightRound />} />
				</Button>
			</div>
		</>
	);
}
