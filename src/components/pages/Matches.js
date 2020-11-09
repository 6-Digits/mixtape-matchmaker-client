import React, { useState, useEffect} from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, TextField} from '@material-ui/core';
import { Media, Player, utils } from 'react-media-player'
import PlayerControls from "../modals/PlayerControls";
import NavigationBar from '../modules/NavigationBar';
import Playlist from "../modules/Playlist";
import MatchSettings from "../modals/MatchSettings";
import GoMatch from "../modals/GoMatch";
import ViewMatch from "../modals/ViewMatch";
import playlistData from '../data/playlist.json';

const { keyboardControls } = utils;
const importedSongs = playlistData['songs'];

const useStyles = makeStyles((theme) => ({
	form: {
		width: '100%'
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		fontWeight: "bold",
		fontFamily: "Arial Black",
		fontSize: "1.5rem"
	},
	content: {
		marginTop: "5vh",
	},
	fullHeight: {
		height: "100%"
	},
	playlistEdit: {
		marginTop: "1rem",
		padding: "0 0 2vh 0"
	},
	media: {
		position: 'relative',
		height: '100%',
		width: '100%',
	},
	player: {
		width: '100%',
		height: '100%',
	},
}));

function Matches({user, setUser}) {
	const classes = useStyles();
	const [width, setWidth] = useState(0);
	const [songs, setSongs] = useState(importedSongs);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentSong, setCurrentSong] = useState(songs[currentIndex]);
	
	useEffect(() => {
		function updateWidth() {
			setWidth(window.innerWidth);
		}
		window.addEventListener('resize', updateWidth);
		updateWidth();
		return () => window.removeEventListener('resize', updateWidth);
	}, []);
	
	useEffect(() => {
		setCurrentSong(songs[currentIndex]);
	}, [currentIndex]);
	
	const handleCurrentIndex = (value) => {
		if (value >= songs.length) {
			setCurrentIndex(0);
		}
		else if (value < 0) {
			setCurrentIndex(songs.length - 1);
		}
		else {
			setCurrentIndex(value);
		}
	}
	
	return (
		<div style={{height: width > 599 ? "100vh" : "100%"}}>
			<NavigationBar setUser={setUser} user={user} pageName='My Matches'></NavigationBar>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				className={classes.content}
			>
				<Grid 
					container
					direction="column"
					justify="space-evenly"
					alignItems="center"
					item xs={12} sm={4}
					spacing={1}
					style={{marginTop: width > 599 ? "4rem" : "0"}}>
					<Grid container item xs={12} sm={11}>	
						<Media>
							{mediaProps => (
							<div className={classes.media} onKeyDown={keyboardControls.bind(null, mediaProps)}>
								<Player src={currentSong.src} autoPlay={true} className={classes.player} />
								<PlayerControls currentIndex={currentIndex} handleCurrentIndex={handleCurrentIndex} />
							</div>
							)}
						</Media>
					</Grid>
					<Grid container item xs={12} sm={11}
						direction="column"
						justify="center"
						alignItems="center">	
						<Grid container item xs={12} fullWidth>
							<MatchSettings></MatchSettings>
						</Grid>
						<Grid container item xs={12} fullWidth>
							<GoMatch></GoMatch>
						</Grid>
						<Grid container item xs={12} fullWidth>
							<ViewMatch></ViewMatch>
						</Grid>
					</Grid>
				</Grid>
				<Grid container item xs={12} sm={7}>
					<Playlist title="My Match Playlist" importable={true} editable={true} draggable={true}
					songs={importedSongs} currentIndex={currentIndex} handleCurrentIndex={handleCurrentIndex}/>
					<Grid
						container
						direction="column"
						justify="space-evenly"
						alignItems="center"
						spacing={4}
						className={classes.playlistEdit}
						>
						<Grid container item xs={12} spacing={3}>	  
							<TextField 	
							fullWidth
							id="playlist-title" 
							label="Title of Match Playlist" 
							variant="outlined" />
						</Grid>

						<Grid container item xs={12} spacing={3}>
							<TextField 
							fullWidth
							id="playlist-desc" 
							label="Description of Match Playlist" 
							multiline
							rows={8}
							variant="outlined" />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default Matches;