import React from 'react'
import { withMediaProps, utils } from 'react-media-player'
import { Grid, IconButton, Slider, makeStyles, Avatar } from '@material-ui/core';
import { PauseCircleFilled, PlayCircleFilled, SkipPrevious, SkipNext, VolumeUp, VolumeDown, VolumeOff } from '@material-ui/icons';
import Marquee from 'react-double-marquee';

const { formatTime } = utils;
const useStyles = makeStyles(()=>({
	videoSlider: {
	},
	volumeSlider: {
	},
	playerIMG: {
		height: "4rem",
		width: "100%"
	},
	imgSrc: {
		height: "100%",
		width: "100%"
	},
	marquee: {
		whiteSpace: 'nowrap',
		fontWeight: 'bold',
		fontFamily: 'Lucida Console'
	},
	
}));

function PlayerControls({media, currentIndex, handleCurrentIndex, imgUrl, autoPlay, setAutoPlay, name, screenWidth}) {
	const classes = useStyles();
	const { volume, duration, currentTime } = media;
	
	const handlePlayPause = () => {
		media.playPause();
		setAutoPlay(true);
	}
	
	const handleMuteUnmute = () => {
		media.muteUnmute();
	}
	
	const handleVolume = (event, value) => {
		media.setVolume(value.toFixed(4));
	}
	
	const handleSeek = (event, value) => {
		media.seekTo(value.toFixed(4));
		setAutoPlay(true);
	}
	
	
	const handleNext = () => {
		handleCurrentIndex(currentIndex + 1);
		setAutoPlay(true);
	}
	
	const handlePrevious = () => {
		handleCurrentIndex(currentIndex - 1);
		setAutoPlay(true);
	}
	
	return (
		<Grid container direction="row" alignItems="center" justify="space-between">
				{/* <Grid item>
					<IconButton onClick={handleFullscreen}>
						{media.isFullscreen ? <Fullscreen /> : <FullscreenExit />}
					</IconButton>
				</Grid> */}
				<Grid item xs={1}>
					<Avatar variant="square" className={classes.playerIMG} src={imgUrl}></Avatar>
				</Grid>
				<Grid item xs={screenWidth > 900 ? 1 : screenWidth > 600 ? 1 : 2} container variant='outlined'>
					<IconButton className={classes.imgSrc} onClick={handlePrevious}>
						<SkipPrevious fontSize="large" />
					</IconButton>
				</Grid>
				
				<Grid item xs={screenWidth > 900 ? 1 : screenWidth > 600 ? 2 : 2} container>
					<IconButton className={classes.imgSrc} onClick={handlePlayPause}>
						{media.isPlaying ? <PauseCircleFilled fontSize="large" /> : <PlayCircleFilled fontSize="large" />}
					</IconButton>
				</Grid>
				
				<Grid item xs={screenWidth > 900 ? 1 : screenWidth > 600 ? 1 : 2} container>
					<IconButton className={classes.imgSrc} onClick={handleNext}>
						<SkipNext fontSize="large" />
					</IconButton>
				</Grid>

				<Grid item xs={screenWidth > 900 ? 6 : screenWidth > 600 ? 4 : 3} container direction="row" justify="space-between" >
					{ name ?  
						<Grid item xs={12} container justify="center" className={classes.marquee}>
							{ name.length > 48 ? 
								<Marquee delay={1000} direction="left" className={classes.marqueeText}>{`${name}`}</Marquee> : 
								<div className={classes.marqueeText}>{`${name}`}</div>
							}
						</Grid>
						: null
					}
					<Grid item xs={12} container justify="space-between" alignItems="center">
						<Grid item xs={2} container justify="center">
							<time>
								{formatTime(media.currentTime)}
							</time>
						</Grid>
						<Grid item xs={8} container justify="center">
							<Slider value={currentTime} min={0} max={duration ? duration.toFixed(4) : 0} step={1} onChange={handleSeek} className={classes.videoSlider}/>
						</Grid>
						<Grid item xs={2} container  justify="center">
							<time>
								{formatTime(media.duration)}
							</time>
						</Grid>
					</Grid>
				</Grid>
				
				<Grid item xs={1} container justify='center'>
					<IconButton onClick={handleMuteUnmute}>
						{media.isMuted ? <VolumeOff /> : volume > 0.5 ? <VolumeUp /> : <VolumeDown />}
					</IconButton>
				</Grid>
				
				<Grid item xs={1} container>
					<Slider value={volume} min={0} max={1} step={0.05} onChange={handleVolume} className={classes.volumeSlider}/>
				</Grid>
		</Grid>
	)
}

export default withMediaProps(PlayerControls);