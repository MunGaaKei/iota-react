import { HTMLAttributes } from "react";
import { Props as PropsProgress } from "../progress/type";

export interface Props extends HTMLAttributes<HTMLVideoElement> {
	src?: string;
	controls?: boolean;
	autoplay?: boolean;
	muted?: boolean;
	volume?: number;
	height?: number | string;
	width?: number | string;
	timeProgressProps?: PropsProgress;
	volumeProgressProps?: PropsProgress;
}

export interface RefVideo {
	play: () => void;
	pause: () => void;
	fullscreen: (full?: boolean) => void;
	getVideo: () => HTMLVideoElement | null;
}
