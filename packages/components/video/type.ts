import { HTMLAttributes } from "react";
import { IProgress } from "../progress/type";

export interface IVideo extends HTMLAttributes<HTMLVideoElement> {
	src?: string;
	controls?: boolean;
	autoplay?: boolean;
	muted?: boolean;
	volume?: number;
	height?: number | string;
	width?: number | string;
	useOriginControls?: boolean;
	timeProgressProps?: IProgress;
	volumeProgressProps?: IProgress;
	onFullScreenChange?: (fullscreen: boolean) => void;
}

export interface RefVideo {
	play: () => void;
	pause: () => void;
	stop: () => void;
	fullscreen: (full?: boolean) => void;
	getVideo: () => HTMLVideoElement | null;
}
