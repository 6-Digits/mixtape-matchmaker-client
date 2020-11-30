import React, { useState, useEffect} from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, TextField, Button} from '@material-ui/core';
import { Media, Player, utils } from 'react-media-player'
import PlayerControls from "../modals/PlayerControls";
import NavigationBar from '../modules/NavigationBar';
import Playlist from "../modules/Playlist";
import MatchSettings from "../modals/MatchSettings";
import GoMatch from "../modals/GoMatch";
import ViewMatch from "../modals/ViewMatch";
import playlistData from '../data/playlist.json';
import placeholder from "../../assets/placeholder.png";

const { keyboardControls } = utils;
const importedSongs = playlistData['songs'];

const useStyles = makeStyles((theme) => ({
	form: {
		width: '100%'
	},
	saveButton: {
		fontWeight: "bold",
		position: "absolute",
		top: '6rem',
		right: '1rem',
		height: '3rem',
		width: '10rem'
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		fontWeight: "bold",
		fontFamily: "Arial Black",
		fontSize: "1.5rem"
	},
	content: {
		padding: "0 1rem 0 1rem",
		background: theme.palette.background.paper
	},
	fullHeight: {
		height: "100%"
	},
	media: {
		marginTop: '1rem',
		height: '100%',
		width: '100%',
	},
	player: {
		display: 'none'
	},
	playlistContainer: {
		padding: '1rem 1rem 1rem 1rem'
	},
	descContainer: {
		marginTop: '1rem'
	}
}));

const matchPlaylistAPI = "http://localhost:42069/api/match/mixtape/uid/:uid";
const errorDefault = "Could not save the playlist for some reason. You may be disconnected from the network or the server is down.";
const errorPlaylist = "Your match playlist cannot be empty!";
const errorTitle = "The title is either too long (More than 255 Characters) or empty. Please enter a valid title!";
const errorDescription = "The description is too long (More than 5000 characters). Please enter a valid description!";
const api = 'http://localhost:42069/api';

function Matches({user, setUser}) {
	const classes = useStyles();
	const [width, setWidth] = useState(0);
	const [changed, setChanged] = useState(false);
	const [songs, setSongs] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentSong, setCurrentSong] = useState(songs ? songs[currentIndex] : null);
	const [autoPlay, setAutoPlay] = useState(false);
	const [error, setError] = useState(false);
	const [success, setSuccess] = useState(false);
	const [errorMsg, setErrorMsg] = useState(errorDefault);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");

	useEffect(() => {
		function updateWidth() {
			setWidth(window.innerWidth);
		}
		window.addEventListener('resize', updateWidth);
		updateWidth();
		return () => window.removeEventListener('resize', updateWidth);

	}, []);
	
	useEffect(() => {
		if(songs){
			setCurrentSong(songs[currentIndex]);
		}
	}, [currentIndex, songs, autoPlay]);
	
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
	
	const titleChange = (e) => {
		setTitle(e.target.value);
		setError(false);
		setSuccess(false)
	}

	const descriptionChange = (e) => {
		setDescription(e.target.value);
		setError(false);
		setSuccess(false)
	}

	return (
		<div style={{height: width > 599 ? "100vh" : "100%"}}>
			<NavigationBar setUser={setUser} user={user} pageName='My Matches'></NavigationBar>
			<Grid
				container
				direction="column"
				alignItems="center"
				justify="center"
				className={classes.playlistContainer}
				>
				<Button variant="contained" color="secondary" className={classes.saveButton}>Save Changes</Button>
				<Playlist title="My Match Playlist" importable={true} editable={true} draggable={true}
									songs={songs} setSongs={setSongs} currentIndex={currentIndex} handleCurrentIndex={handleCurrentIndex}
									setChanged={setChanged} playlistID={"OOOOGGGBOOOGGGAAAAOOOOOOGGGGAAAA"}
									setAutoPlay={setAutoPlay} />
				<Media>
					{mediaProps => (
					<div className={classes.media} onKeyDown={keyboardControls.bind(null, mediaProps)}>
						<Player src={currentSong ? currentSong.url : null} autoPlay={autoPlay} className={classes.player} defaultVolume={0.25}/>
						<PlayerControls currentIndex={currentIndex} 
							name={currentSong ? `${currentSong['title']} - ${currentSong['author']}` : null} 
							handleCurrentIndex={handleCurrentIndex} imgUrl={currentSong ? currentSong.imgUrl : placeholder} 
							setAutoPlay={setAutoPlay}  />
					</div>
					)}
				</Media>
			</Grid>
					{error ? <div className={classes.error}>{errorMsg}</div> : null}
					{success ? <div className={classes.success}>{"Changes have been saved successfully!"}</div> : null}
			<Grid
				container
				direction={width > 599 ? "row" : "column"}
				justify="center"
				alignItems="center"
				justify="space-between"
				className={classes.content}
				fullWidth
			>
				<Grid 
					direction="column"
					justify="space-between"
					alignItems="center"
					item 
					xs={width > 599 ? 4 : 12}
					style={{width: width > 599 ? null : '100%' }}
					>
					<Grid container item xs={12}>
						<MatchSettings></MatchSettings>
					</Grid>
					<Grid container item xs={12}>
						<GoMatch></GoMatch>
					</Grid>
					<Grid container item xs={12}>
						<ViewMatch user={user}></ViewMatch>
					</Grid>
				</Grid>
				<Grid
					direction="column"
					justify="space-between"
					alignItems="center"
					xs={width > 599 ? 8 : 12}
					item
					style={{width: width > 599 ? null : '100%', 
							padding: width > 599 ? "0 1rem 0 1rem" : null}}
					>
					<Grid container item xs={12}>	  
						<TextField 	
						fullWidth
						id="playlist-title" 
						label="Title of Match Playlist" 
						value={title}
						onChange={titleChange}
						variant="outlined" />
					</Grid>

					<Grid container item xs={12} className={classes.descContainer}>
						<TextField 
						fullWidth
						id="playlist-desc" 
						label="Description of Match Playlist" 
						value={description}
						onChange={descriptionChange}
						multiline
						rows={8}
						variant="outlined" />
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default Matches;