import { Button, Icon } from "@p";
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
import { throttle } from "radash";
import { useMemo, useRef } from "react";
import { getFileType, getSuffixByUrl } from "../utils";
import DefaultRenderFile from "./renderFile";
import { IPreview, TFileType, TPreviewItem } from "./type";

export default function Content(props: IPreview) {
	const {
		items = [],
		initial = 0,
		renderFile = DefaultRenderFile,
		onRotate,
		onChange,
		onClose,
		onZoom,
	} = props;
	const state = useReactive({
		current: initial,
		rotate: 0,
		scale: 1,
		translate: `0, 0`,
	});
	const box = useRef<HTMLDivElement>(null);

	const files = useMemo(() => {
		return items.map((item) => {
			const o: TPreviewItem = {
				src: "",
			};
			if (typeof item === "string") {
				o.src = item;
			} else {
				Object.assign(o, item);
			}

			o.suffix = getSuffixByUrl(o.src) || "";
			o.type = getFileType(o.suffix, item["type"]);

			return o;
		});
	}, [items]);

	const { file, content } = useMemo(() => {
		const file = files[state.current];
		const content = renderFile(file);

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

		if (state.scale !== 1) {
			state.scale = 1;
			onZoom?.(1);
		}
		onRotate?.(state.rotate);
	};

	const handleRotate = (deg: number) => {
		state.rotate += deg;

		onRotate?.(state.rotate);

		const sr = box.current?.getBoundingClientRect();
		const pr = box.current?.offsetParent?.getBoundingClientRect();
		if (!sr || !pr) return;
		const { width: sw, height: sh } = sr;
		const { width: pw, height: ph } = pr;
		const exceed = sw > ph || sh > pw;

		state.scale = exceed ? Math.min(ph / sw, pw / sh) : 1;
	};

	const handleMouseWheel = throttle({ interval: 60 }, (e) => {
		if (file.type !== TFileType.IMAGE) return;
		let after = state.scale + (e.deltaY < 0 ? 0.05 : -0.05);
		if (after > 2) after = 2;
		if (after < 0.25) after = 0.25;

		onZoom?.(after);
		state.scale = after;
	});

	return (
		<>
			<div
				ref={box}
				className='i-preview-content'
				style={{
					transform: `rotate(${state.rotate}deg) scale(${state.scale})`,
				}}
				onWheel={handleMouseWheel}
				onClick={(e) => e.stopPropagation()}
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

				{files.length > 1 && (
					<>
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
					</>
				)}
			</div>
		</>
	);
}
