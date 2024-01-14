import {
	FullscreenExitRound,
	FullscreenRound,
	PauseRound,
	PlayArrowRound,
	StopRound,
	VolumeDownRound,
	VolumeOffRound,
} from "@ricons/material";
import { useMemoizedFn, useReactive } from "ahooks";
import classNames from "classnames";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import Button from "../button";
import Icon from "../icon";
import Progress from "../progress";
import Text from "../text";
import "./index.scss";
import { Props, RefVideo } from "./type";

const Video = forwardRef<RefVideo, Props>((props, ref): JSX.Element => {
	const {
		style,
		controls = true,
		autoplay,
		muted,
		volume = 50,
		height,
		width,
		timeProgressProps = {
			barClass: "bg-black",
		},
		volumeProgressProps = {
			barClass: "bg-black",
		},
		className,
		...restProps
	} = props;
	const state = useReactive({
		playing: autoplay,
		volume,
		current: 0,
		duration: 0,
		isFullscreen: false,
	});
	const $v = useRef<HTMLVideoElement>(null);

	const timeUpdateListener = useMemoizedFn((e) => {
		const tar = e.target;
		if (tar.paused) return;

		Object.assign(state, {
			current: tar.currentTime,
		});
	});

	const playChangeListener = useMemoizedFn((e) => {
		const tar = e.target;
		state.playing = !tar.paused;
	});

	const fullscreenListener = useMemoizedFn((e) => {
		const tar = $v.current?.parentElement;
		if (!tar) return;

		handleFullscreen();
	});

	const handlePlay = useMemoizedFn(() => {
		const v = $v.current;
		if (!v) return;

		v.paused ? v.play() : v.pause();
	});

	const handleReady = useMemoizedFn((e) => {
		const tar = e.target;
		Object.assign(state, {
			duration: tar.duration,
			current: tar.currentTime,
			volume: tar.volume * 100,
		});
	});

	const handleStop = useMemoizedFn(() => {
		const v = $v.current;
		if (!v) return;

		v.currentTime = 0;
		!v.paused && v.pause();
	});

	const handleFullscreen = useMemoizedFn((fs?: boolean) => {
		const tar = $v.current?.parentElement;
		if (!tar) return;

		state.isFullscreen = typeof fs === "boolean" ? fs : !state.isFullscreen;
	});

	useImperativeHandle(ref, () => ({
		play: () => {
			const v = $v.current;
			if (!v) return;

			v.play();
		},
		pause: () => {
			const v = $v.current;
			if (!v) return;

			v.pause();
		},
		fullscreen: handleFullscreen,
		getVideo: () => $v.current,
	}));

	useEffect(() => {
		const v = $v.current;
		if (!v) return;

		state.playing ? v.play() : v.pause();
	}, [state.playing, $v.current]);

	useEffect(() => {
		const v = $v.current;
		if (!v) return;

		v.addEventListener("timeupdate", timeUpdateListener);
		v.addEventListener("play", playChangeListener);
		v.addEventListener("pause", playChangeListener);
		document.addEventListener("fullscreenchange", fullscreenListener);

		return () => {
			v.removeEventListener("timeupdate", timeUpdateListener);
			v.removeEventListener("play", playChangeListener);
			v.removeEventListener("pause", playChangeListener);
			document.removeEventListener(
				"fullscreenchange",
				fullscreenListener
			);
		};
	}, []);

	return (
		<div
			className={classNames("i-video", className)}
			style={{ height, width, ...style }}
		>
			<video
				ref={$v}
				muted={muted}
				onCanPlay={handleReady}
				{...restProps}
			/>

			{controls && (
				<div className='i-video-controls'>
					<div className='i-video-control flex-1'>
						<Button.Toggle
							className='i-video-btn'
							flat
							square
							after={<Icon icon={<PauseRound />} />}
							active={state.playing}
							onToggle={handlePlay}
						>
							<Icon icon={<PlayArrowRound />} />
						</Button.Toggle>
						<Button
							className='i-video-btn'
							flat
							square
							onClick={handleStop}
						>
							<Icon icon={<StopRound />} />
						</Button>
						<span className='i-video-times'>
							<Text.Time time={state.current} /> /
							<Text.Time time={state.duration} />
						</span>
						<Progress
							{...timeProgressProps}
							value={state.current}
						/>
					</div>
					<div className='i-video-control'>
						<Button.Toggle
							className='i-video-btn'
							flat
							square
							after={<Icon icon={<FullscreenExitRound />} />}
							active={state.isFullscreen}
							onToggle={handleFullscreen}
						>
							<Icon icon={<FullscreenRound />} />
						</Button.Toggle>
					</div>
					<div className='i-video-control'>
						<Button.Toggle
							className='i-video-btn'
							flat
							square
							after={<Icon icon={<VolumeOffRound />} />}
						>
							<Icon icon={<VolumeDownRound />} />
						</Button.Toggle>
						<Progress
							value={state.volume}
							style={{ width: 100 }}
							{...volumeProgressProps}
						/>
					</div>
				</div>
			)}
		</div>
	);
});

export default Video;
