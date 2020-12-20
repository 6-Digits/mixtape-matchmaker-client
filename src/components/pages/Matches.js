import React, { useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Button} from '@material-ui/core';
import { Media, Player, utils } from 'react-media-player'
import PlayerControls from "../modules/PlayerControls";
import NavigationBar from '../modules/NavigationBar';
import Playlist from "../modules/Playlist";
import MatchSettings from "../modals/MatchSettings";
import GoMatch from "../modals/GoMatch";
import ViewMatch from "../modals/ViewMatch";
import placeholder from "../../assets/placeholder.png";
import { v4 as uuidv4 } from 'uuid';

const { keyboardControls } = utils;

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
		height: 0,
		width: 0,
		display: 'none'
	},
	playlistContainer: {
		padding: '1rem 1rem 1rem 1rem'
	},
	descContainer: {
		marginTop: '1rem'
	},
	error: {
		textAlign: 'center',
		fontSize: '2rem',
		color: theme.palette.error.main,
		marginBottom: '1rem'
	},
	success: {
		textAlign: 'center',
		fontSize: '2rem',
		color: theme.palette.success.main,
		marginBottom: '1rem'
	}
}));

const errorDefault = "Could not save the playlist for some reason. You may be disconnected from the network or the server is down.";
const errorPlaylist = "Your match playlist cannot be empty or exceed 30 songs!";
const errorTitle = "The title is either too long (More than 255 Characters) or empty. Please enter a valid title!";
const errorDescription = "The description is too long (More than 5000 characters). Please enter a valid description!";
const errorChanges = "You have not made any changes!";

const api = window.location.protocol+'//'+window.location.hostname+':42069';

function Matches({user, setUser, notifications, setNotifications}) {
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
	const [playlistID, setPlaylistID] = useState("");
	const [timeOut, setTimeOut] = useState(null);

	useEffect(() => {
		function updateWidth() {
			setWidth(window.innerWidth);
		}
		window.addEventListener('resize', updateWidth);
		updateWidth();
		let userToken = localStorage.getItem('userToken');
		fetchMatchPlaylist(userToken, user);
		return () => window.removeEventListener('resize', updateWidth);
	}, []);
	
	useEffect(() => {
		if (songs.length > 0) {
			setCurrentSong(songs[currentIndex]);
		}
	}, [currentIndex, songs, autoPlay]);

	useEffect(() => {
		if(success || error) {
			clearTimeout(timeOut);
			setTimeOut(setTimeout(()=>{
				setError(false);
				setSuccess(false);
			}, 5000));
		}
	}, [error, success]);
	
	
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

	const fetchMatchPlaylist = async(userToken, user) => {
		let requestOptions = {
			method: 'GET',
			headers: {'Content-Type': 'application/json', 'x-access-token': userToken}
		};
		let response = await fetch(`${api}/match/mixtape/uid/${user._id}`, requestOptions);
		if(response.status === 200) {
			let data = await response.json();
			let updatedSongList = data['songList'].map((song) => {
				song['uuid'] = uuidv4() + uuidv4();
				// if(song['duration']){
				// 	totalLength += song['duration'];
				// }
				return song;
			});
			setSongs(updatedSongList);
			setCurrentSong(data['songList'] ? data['songList'][currentIndex] : null);
			setDescription(data['description'] ? data['description'] : "");
			setTitle(data['name'] ? data['name'] : "");
			setPlaylistID(data['_id'] ? data['_id'] : "");
		} else {
			alert(`Failed to get match playlist with error: ${response.status}!`);
		}
	};
	
	const saveMatchPlaylist = async() => {
		if(changed) {
			setError(false);
			setSuccess(false);
			if(title.length < 1 || title.length > 255)  {
				setErrorMsg(errorTitle);
				setError(true);
			} else if(description.length > 5000) {
				setErrorMsg(errorDescription);
				setError(true);
			} else if(songs.length < 1 || songs.length > 30) {
				setError(true);
				setErrorMsg(errorPlaylist);
			} else {
				let userToken = localStorage.getItem('userToken');
				let playlistData = {
					name: title,
					description: description,
					songList: songs.map((song) => song['_id']),
				};
				let requestOptions = {
					method: 'POST',
					headers: {'Content-Type': 'application/json', 'x-access-token': userToken},
					body: JSON.stringify(playlistData)
				};
				let response = await fetch(`${api}/match/mixtape/mid/${playlistID}`, requestOptions);
				if(response.status === 200) {
					setSuccess(true);
				} else {
					setErrorMsg(errorDefault);
					setError(true);
				}
			}
		} else {
			setErrorMsg(errorChanges);
			setError(true);
		}
	};
	
	const handleNextSong = () => {
		setAutoPlay(true);
		handleCurrentIndex(currentIndex + 1);
	};

	return (
		<div style={{height: width > 599 ? "100vh" : "100%"}}>
			<NavigationBar setUser={setUser} user={user} setNotifications={setNotifications}
			notifications={notifications} pageName='My Matches'></NavigationBar>
			<Grid
				container
				direction="column"
				alignItems="center"
				justify="center"
				className={classes.playlistContainer}
				>
				<Button variant="contained" color="secondary" className={classes.saveButton} onClick={saveMatchPlaylist}>Save Changes</Button>
				<Playlist title="My Match Playlist" editable={true} draggable={true}
					songs={songs} setSongs={setSongs} currentIndex={currentIndex} handleCurrentIndex={handleCurrentIndex}
					setChanged={setChanged} playlistID={playlistID} setAutoPlay={setAutoPlay} notSharable={true}/>
				<Media>
					{mediaProps => (
					<div className={classes.media} onKeyDown={keyboardControls.bind(null, mediaProps)}>
						<Player src={currentSong ? currentSong.url : null} autoPlay={autoPlay} className={classes.player} 
							defaultVolume={0.5} onEnded={handleNextSong} />
						<PlayerControls currentIndex={currentIndex} 
							name={currentSong ? `${currentSong['title']} - ${currentSong['author']}` : null} 
							handleCurrentIndex={handleCurrentIndex} imgUrl={currentSong ? currentSong.imgUrl : placeholder} 
							autoPlay={autoPlay} setAutoPlay={setAutoPlay}  />
					</div>
					)}
				</Media>
			</Grid>
					{error ? <div className={classes.error}>{errorMsg}</div> : null}
					{success ? <div className={classes.success}>{"Changes have been saved successfully!"}</div> : null}
			<Grid
				container
				direction={width > 599 ? "row" : "column"}
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
						<MatchSettings user={user}></MatchSettings>
					</Grid>
					<Grid container item xs={12}>
						<GoMatch user={user}></GoMatch>
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