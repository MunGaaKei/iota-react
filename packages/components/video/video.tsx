import { exitFullScreen, fullScreen } from "@p/js/utils";
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
import "./index.css";
import { IVideo, RefVideo } from "./type";

const Video = forwardRef<RefVideo, IVideo>((props, ref): JSX.Element => {
	const {
		style,
		controls = true,
		autoplay,
		muted,
		volume = 50,
		height,
		width,
		useOriginControls,
		timeProgressProps = {
			barClass: "bg-2",
		},
		volumeProgressProps = {
			barClass: "bg-1",
		},
		className,
		...restProps
	} = props;
	const state = useReactive({
		playing: autoplay,
		volume: muted ? 0 : volume,
		volumeCache: 0,
		muted,
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
		state.playing = !e.target.paused;
	});

	const fsChangeListener = useMemoizedFn((e) => {
		const tar = $v.current?.parentElement;
		if (!tar) return;

		state.isFullscreen = document.fullscreenElement === tar;
	});

	const volumeChangeListener = useMemoizedFn((e) => {
		const tar = e.target;
		Object.assign(state, {
			volume: tar.volume * 100,
			muted: tar.volume === 0,
		});
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
		});
		tar.volume = state.volume / 100;
	});

	const handleMuted = useMemoizedFn(() => {
		const v = $v.current;
		if (!v) return;

		if (v.volume > 0) {
			state.volumeCache = v.volume;
			v.volume = 0;
			return;
		}
		v.volume = state.volumeCache === 0 ? 0.5 : state.volumeCache;
	});

	const handleStop = useMemoizedFn(() => {
		const v = $v.current;
		if (!v) return;

		v.currentTime = 0;
		v.pause();
	});

	const handleFullscreen = useMemoizedFn((fs?: boolean) => {
		const tar = $v.current?.parentElement;
		if (!tar) return;

		state.isFullscreen ? exitFullScreen() : fullScreen(tar);
	});

	const handleUpdateTime = useMemoizedFn((t) => {
		const v = $v.current;
		if (!v) return;

		v.currentTime = (state.duration * t) / 100;
	});

	const handleUpdateVolume = useMemoizedFn((t) => {
		const v = $v.current;
		if (!v) return;

		v.volume = t / 100;
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
		stop: handleStop,
		fullscreen: handleFullscreen,
		getVideo: () => $v.current,
	}));

	useEffect(() => {
		const v = $v.current;
		if (!v) return;

		v.addEventListener("timeupdate", timeUpdateListener);
		v.addEventListener("play", playChangeListener);
		v.addEventListener("pause", playChangeListener);
		v.addEventListener("volumechange", volumeChangeListener);
		document.addEventListener("fullscreenchange", fsChangeListener);

		return () => {
			v.removeEventListener("timeupdate", timeUpdateListener);
			v.removeEventListener("play", playChangeListener);
			v.removeEventListener("pause", playChangeListener);
			v.removeEventListener("volumechange", volumeChangeListener);
			document.removeEventListener("fullscreenchange", fsChangeListener);
		};
	}, []);

	return (
		<div
			className={classNames("i-video", className)}
			style={{ height, width, ...style }}
			onClick={handlePlay}
			onDoubleClick={() => handleFullscreen()}
		>
			<video
				ref={$v}
				onCanPlay={handleReady}
				{...restProps}
				controls={useOriginControls}
			/>

			{controls && !useOriginControls && (
				<div
					className='i-video-controls'
					onClick={(e) => e.stopPropagation()}
				>
					<div className='i-video-control flex-1'>
						<Button.Toggle
							className='i-video-btn'
							flat
							square
							after={<Icon icon={<PauseRound />} />}
							active={state.playing}
							onClick={handlePlay}
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
							className='mr-8'
							{...timeProgressProps}
							value={(state.current / state.duration) * 100}
							onChange={handleUpdateTime}
						/>
					</div>
					<div className='i-video-control'>
						<Button.Toggle
							className='i-video-btn'
							flat
							square
							after={<Icon icon={<FullscreenExitRound />} />}
							active={state.isFullscreen}
							onClick={() => handleFullscreen()}
						>
							<Icon icon={<FullscreenRound />} />
						</Button.Toggle>
					</div>
					<div className='i-video-control'>
						<Button.Toggle
							className='i-video-btn'
							flat
							square
							active={state.volume <= 0}
							after={
								<Icon icon={<VolumeOffRound />} size='1.2em' />
							}
							onClick={handleMuted}
						>
							<Icon icon={<VolumeDownRound />} />
						</Button.Toggle>
						<Progress
							style={{ width: 100 }}
							className='mr-8'
							{...volumeProgressProps}
							value={state.volume}
							onChange={handleUpdateVolume}
						/>
					</div>
				</div>
			)}
		</div>
	);
});

export default Video;
