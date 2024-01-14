import { CSSProperties, ReactNode } from "react";

export type TPreviewItem = {
	src: string;
	name?: ReactNode;
	thumb?: string;
	rotate?: number;
	zoom?: number;
	style?: CSSProperties;
	type?: TFileType;
	suffix?: string;
};

export enum TFileType {
	IMAGE = "IMAGE",
	VIDEO = "VIDEO",
	AUDIO = "AUDIO",
	PDF = "PDF",
	EXCEL = "EXCEL",
	TXT = "TXT",
	UNKNOWN = "UNKNOWN",
}

export interface Props {
	items: (TPreviewItem | string)[];
	initial?: number;
	controls?: boolean;
	loop?: boolean;
	backdropClosable?: boolean;
	className?: string;
	style?: CSSProperties;
	renderImage?: (file?: TPreviewItem) => ReactNode;
	renderVideo?: (file?: TPreviewItem) => ReactNode;
	renderAudio?: (file?: TPreviewItem) => ReactNode;
	renderPdf?: (file?: TPreviewItem) => ReactNode;
	renderUnknown?: (file?: TPreviewItem) => ReactNode;
	onClose?: () => void;
	onChange?: (after?: number, before?: number) => void;
	onZoom?: () => void;
	onRotate?: (deg?: number) => void;
}
