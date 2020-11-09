import React, { useState } from 'react'
import { withMediaProps, utils } from 'react-media-player'
import { Grid, IconButton, Slider } from '@material-ui/core';
import { PauseCircleFilled, PlayCircleFilled, SkipPrevious, SkipNext, VolumeUp, VolumeDown, VolumeOff, Fullscreen, FullscreenExit } from '@material-ui/icons';
const { formatTime } = utils;


function PlayerControls({media}) {
	const { volume, duration, currentTime } = media;
	
	const handlePlayPause = () => {
		media.playPause();
	}
	
	const handlePrevious = () => {
		
	}
	
	const handleNext = () => {
		
	}
	
	const handleMuteUnmute = () => {
		media.muteUnmute();
	}
	
	const handleVolume = (event, value) => {
		media.setVolume(value.toFixed(4));
	}
	
	const handleSeek = (event, value) => {
		media.seekTo(value.toFixed(4));
	}
	
	const handleFullscreen = () => {
		media.fullscreen();
	}
	
	return (
		<div>
			<Grid container spacing={2}>				
				<Grid item>
					<time>
						{formatTime(media.currentTime)}
					</time>
				</Grid>
				
				<Grid item xs>
					<Slider value={currentTime} min={0} max={duration.toFixed(4)} step={1} onChange={handleSeek} />
				</Grid>
				
				<Grid item>
					<time>
						{formatTime(media.duration)}
					</time>
				</Grid>
				
				<Grid item>
					<IconButton onClick={handleMuteUnmute}>
						{media.isMuted ? <VolumeOff /> : volume > 0.5 ? <VolumeUp /> : <VolumeDown />}
					</IconButton>
				</Grid>
				
				<Grid item xs>
					<Slider value={volume} min={0} max={1} step={0.05} onChange={handleVolume} />
				</Grid>
				
				<Grid item>
					<IconButton onClick={handleFullscreen}>
						{media.isFullscreen ? <Fullscreen /> : <FullscreenExit />}
					</IconButton>
				</Grid>
			</Grid>
			
			<Grid container spacing={2}>
				<Grid item>
					<IconButton onClick={handlePrevious}>
						<SkipPrevious fontSize="large" />
					</IconButton>
				</Grid>
				
				<Grid item>
					<IconButton onClick={handlePlayPause}>
						{media.isPlaying ? <PauseCircleFilled fontSize="large" /> : <PlayCircleFilled fontSize="large" />}
					</IconButton>
				</Grid>
				
				<Grid item>
					<IconButton onClick={handleNext}>
						<SkipNext fontSize="large" />
					</IconButton>
				</Grid>
			</Grid>
		</div>
	)
}

export default withMediaProps(PlayerControls);