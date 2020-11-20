import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Dialog, DialogActions, Button, DialogTitle, DialogContent, DialogContentText, Typography, Grid, Container, TextField, Box, Link, Card, ButtonBase, CardMedia, CardContent, FormControlLabel, Switch } from '@material-ui/core';
import { FavoriteBorder as FavoriteBorderIcon, Favorite as FavoriteIcon, Visibility as VisibilityIcon, Send as SendIcon, Delete as DeleteIcon} from '@material-ui/icons';
import { Media, Player, utils } from 'react-media-player'
import Playlist from "../modules/Playlist";
import PlayerControls from "./PlayerControls";
import placeholder from "../../assets/placeholder.png";
import playlistData from '../data/playlist.json';

const { keyboardControls } = utils;

const useStyles = makeStyles((theme) => ({
	container: {
		width:"100%",
		height:"100%"
	},
	modal: {
		maxWidth: '95%',
		margin: 'auto',
	},
	modalTitle: {
		fontSize: "3rem",
		fontWeight: "bold"
	},
	playlistArea: {
		padding: "1rem 0rem 1rem 0rem",
		borderRadius: '0.5rem',
		backgroundColor: theme.palette.background.default,
		width: "97%",
		margin: "auto"
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
	playlistTitle: {
		textAlign: "center"
	},
	descriptionBox: {
		padding: "1rem 0rem 1rem 0rem",
		width: "97%",
		margin: "auto",
		height: '100%',
	}, 
	commentSection: {
		padding: "1rem 0rem 1rem 0rem",
		width: "97%",
		margin: "auto",
		borderRadius: '0.75rem',
		backgroundColor: theme.palette.background.default,
	},
	icon: {
		height: '3vh',
		width: '3vh'
	},
	playlistDescription: {
		overflowY: "auto",
		height: '20vh'
	},
	playlistAuthor: {
		overflowX: "auto"
	},
	profileImg: {
		width: "100%",
		height: "10vh"
	},
	makeCommentSection: {
		marginTop:"0.75rem",
		marginLeft:"-3.5rem"
	},
	enterComment: {
		width:"102.5%",
		height:"100%",
	},
	sendMessageButton: {
		height:"100%",
		width:"100%",
		marginLeft:'3.25rem'
	},
	sendMsgIcon: {
		height:"50%",
		width:"50%"
	},
	comment:{
		marginTop: '1rem',
		padding: "1rem 1rem 1rem 1rem",
		borderRadius: '0.5rem',
		backgroundColor: theme.palette.text.primary,
		color: theme.palette.background.default
	},
	commentBox: {
		width:'95%',
		height: '40vh',
		overflowY: 'auto',
	},
	messageText: {
		fontSize: '1.5rem'
	},
	messageTS: {
		fontSize: '0.5rem'
	},
	root: {
		maxWidth: 300,
		maxHeight: 250,
	},
	cardMedia: {
		maxHeight: 125,
		padding: 0
	},
	cardContent: {
		textAlign: "left",
		padding: "0.1rem"
	},
	cardAction: {
		display: 'block',
		maxWidth: 300,
		maxHeight: 200,
		height: 200,
	},
	cardTitle: {
		textAlign: "center",
		overflowX: "auto"
	},
	loginError: {
		color: theme.palette.error.main,
		fontSize: '1rem',
		textAlign: 'center',
		marginBottom: '1rem'
	},
	deleteButton: {
		borderRadius: 0
	},
	deleteIcon: {
		height: '100%',
		width: '100%'
	}
}));

const api = 'http://localhost:42069/api';
const errorDefault = "Sorry! We could not save to the playlist. You are either disconnected from the internet or the servers are down. Please save your work using external software and try again later. Click save again to close the playlist.";
const errorTitle = "The playlist title you have entered is empty. Please enter a valid playlist title "
const errorTitleLength = "The playlist title you have entered is too long (exceeds 255 characters). Please enter a valid playlist title.";

function ViewPlaylist({editable, shareable, playlist, fetchPlaylists, user, removePlaylist, setPlaylists, playlists}) {
	
	const importedSongs = playlist ? playlist['songList'] : [];
	const importedDesc = playlist ? playlist['description'] : "";
	const importedThumbnail = playlist ?  playlist['songList'] ? playlist['songList'][0] ? playlist['songList'][0]['imgUrl'] : placeholder : placeholder : placeholder;
	const importedLikeCount = playlist ? playlist['hearts'] : 0;
	const importedComments = playlistData['comments'];
	const importedViewCount = playlist ? playlist['views'] ? playlist['views'] : 0 : 0;
	const importedAuthor = playlist ? playlist['owner'] : null;
	const importedName = playlist ? playlist['name'] : "";
	const importPublic = playlist ? playlist['public'] ? playlist['public'] : false : false;

	const classes = useStyles();
	const [error, setError] = useState(false);
	const [changed, setChanged] = useState(false);
	const [errorMsg, setErrorMsg] = useState(errorDefault);
	const [open, setOpen] = useState(false);
	const [checkedPublic, setCheckedPublic] = useState(importPublic);
	const [description, setDescription] = useState(importedDesc);
	const [viewCount, setViewCount] = useState(importedViewCount);
	const [likeCount, setLikeCount] = useState(importedLikeCount);
	const [liked, setLiked] = useState(false);
	const [thumbnail, setThumbnail] = useState(importedThumbnail);
	const [playlistName, setPlaylistName] = useState(importedName);
	const [profileImage, setProfileImage] = useState("https://i.kym-cdn.com/entries/icons/original/000/029/079/hellothere.jpg");
	const [playlistAuthor, setPlaylistAuthor] = useState(null);
	const [songs, setSongs] = useState(importedSongs);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentSong, setCurrentSong] = useState(songs[currentIndex]);
	const [comments, setComments] = useState(importedComments);
	const [deleteOpen, setDeleteOpen] = useState(false);
		
	const handleOpenDeleteDialog = () => {
		setDeleteOpen(true);
	};
	const handleCloseDeleteDialog = () => {
		setDeleteOpen(false);
	};
	
	shareable = editable ? editable : null;
	
	useEffect(() => {
		if(songs){
			setCurrentSong(songs[currentIndex]);
			if(!playlistAuthor) {
				fetchAuthor();
			}
		}
	}, [currentIndex, songs, liked]);

	const fetchAuthor = async() => {
		let userID = importedAuthor;
		if(userID){
			let requestOptions = {
				method: 'GET',
				headers: {'Content-Type': 'application/json'}
			};
			let response = await fetch(`${api}/profile/id/${userID}`, requestOptions);
			if(response.status === 200) {
				let data = await response.json();
				setPlaylistAuthor(data['userName']);
				setProfileImage(data['imgSrc']);
			} else {
				setPlaylistAuthor('User not found');
			}
		} else {
			setPlaylistAuthor('User not found');
		}
	  };
	
	const handleOpen = () => {
		// setViewCount(viewCount + 1);
		// let requestOptions = {
		// 	method: 'POST',
		// 	headers: {'Content-Type': 'application/json'},
		// 	body: JSON.stringify({mixtapeID: playlist['_id']})
		// };
		
		// //fetch(`${api}/mixtape/view`, requestOptions);
		
		fetch(`${api}/mixtape/likedIDs/uid/${user['_id']}`, {
			method: 'GET',
			headers: {'Content-Type': 'application/json'},
		}).then(async (res) => {
			const data = await res.json();
			//alert(data)
			const found = playlist['_id'] in data;
			setLiked(found);
		}).catch((err) =>{
			alert(err.message)
		})
		
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	};
	
	const handleCheckedPublic = (event) => {
		setCheckedPublic(event.target.checked);
		setChanged(true);
		setError(false);
	};
	
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

	const savePlaylist = async() => {
		if (error){
			//handleClose();
		}
		if (playlist && changed) {
			if (!playlistName || playlistName.length === 0) {
				setError(true);
				setErrorMsg(errorTitle);
			} else if (!playlistName || playlistName.length > 255) {
				setError(true);
				setErrorMsg(errorTitleLength);
			} else {
				let playlistID = playlist['_id'];
				let playlistData = {
					_id: playlistID,
					name: playlistName,
					description: description,
					comments: [],
					songList: songs.map((song) => song['_id']),
					public: checkedPublic,
					match: false,
				};
				let requestOptions = {
					method: 'POST',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify(playlistData)
				};
				let response = await fetch(api + `/mixtape/updateMixtape/id/${playlistID}`, requestOptions);
				if(response.status === 200) {
					let data = await response.json();
					setPlaylists(playlists.map(element=> {
						if(element['_id'] == playlistID) {
							playlistData['songList'] = songs;
							return playlistData;
						}
						return element;
					}));
					setChanged(false);
					handleClose();
				} else {
					alert(response.status);
					setErrorMsg(errorDefault);
					setError(true);
				}
			}
		} else {
			handleClose();
		}
	};
	
	const descriptionChange = (event) => {
		setDescription(event.target.value);
		setError(false);
		setChanged(true);
	};

	const playlistNameChange = (event) => {
		setPlaylistName(event.target.value);
		setError(false);
		setChanged(true);
	};

	const deletePlaylist = async() => {
		let userToken = localStorage.getItem('userToken');
		if(playlist && deleteOpen && userToken) {
			let playlistID = playlist['_id'];
			let requestOptions = {
				method: 'POST',
				headers: {'Content-Type': 'application/json', 'x-access-token': userToken},
			};
			let response = await fetch(api + `/mixtape/deleteMixtape/id/${playlistID}`, requestOptions);
			if(response.status === 200) {
				let data = await response.json();
				handleCloseDeleteDialog();
				removePlaylist(playlistID);
			} else {
				alert(`Failed to delete playlist with error status: ${response.status}`);
				handleCloseDeleteDialog();
			}
		} else {
			alert("Failed to delete playlist because the playlist you've selected doesn't exist!");
			handleCloseDeleteDialog();
		}
	};
	
	const handleLike = () => {
		if (liked) {
			let requestOptions = {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({mixtapeID: playlist['_id'], userID: user['_id']})
			};
			fetch(`${api}/mixtape/unlike`, requestOptions).then((res) => {
				setLiked(false);
				setLikeCount(likeCount - 1);
			}).catch((err) => {})
		}
		else {
			let requestOptions = {
				method: 'POST',
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify({mixtapeID: playlist['_id'], userID: user['_id']})
			};
			fetch(`${api}/mixtape/like`, requestOptions).then((res) => {
				setLiked(true);
				setLikeCount(likeCount + 1);
			}).catch((err) => {})
		}
	}

	
	return (
		<div className={classes.container}>
			<Card className={classes.root}>
				<div className={classes.cardAction}>
					<Button className={classes.cardMedia}>
						<CardMedia component='img' className={classes.cardMedia} image={thumbnail} onClick={handleOpen}/>
					</Button>
					<CardContent className={classes.cardContent}>
						{editable ? 
						<Grid direction="row" container justify="space-between" alignItems="center">
							<Grid item xs={9}><Typography variant='h6' className={classes.cardTitle}>{playlistName}</Typography></Grid>
							<Grid item xs={3}><Button className={classes.deleteButton} onClick={handleOpenDeleteDialog}><DeleteIcon className={classes.deleteIcon}/></Button></Grid>
						</Grid>
						: <Typography variant='h6' className={classes.cardTitle}>{playlistName}</Typography>}
					</CardContent>
				</div>
			</Card>

			{editable ? 
				<Dialog open={deleteOpen} onClose={handleCloseDeleteDialog} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title" >Confirm Delete Playlist</DialogTitle>
					<DialogContent>
						<DialogContentText>
							{`Are you sure about deleting the playlist '${playlistName}'?`}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
					<Button onClick={handleCloseDeleteDialog} color="secondary" className={classes.button}
				variant="contained">
						Cancel
					</Button>
					<Button onClick={deletePlaylist} color="primary" className={classes.button}
				variant="contained">
						Yes, please delete this playlist
					</Button>
					</DialogActions>
				</Dialog>
				: null 
			}

			<Dialog fullWidth={true} maxWidth="xl" className={classes.modal} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				
				<Grid container direction="row" justify="space-between" alignItems="center">
					<Grid item xs={12} sm={6}>
						<DialogTitle disableTypography id="form-dialog-title" className={classes.modalTitle}>View Playlist</DialogTitle>
					</Grid>

					<Grid item xs={12} sm={1} className={classes.importGrid}>
						<DialogActions>
							<Button variant="contained" onClick={editable ? savePlaylist : handleClose } color="secondary" className={classes.cancel}>
								{ editable ? "Save" : "Exit" }
							</Button>
						</DialogActions>
					</Grid> 
				</Grid>
				
				
				<Grid
					container
					direction="row"
                    justify="center"
                    spacing={2}
					alignItems="center"
					className={classes.playlistArea}
					>
					<Grid container item xs={12} sm={5}>
						<Media>
							{mediaProps => (
							<div className={classes.media} onKeyDown={keyboardControls.bind(null, mediaProps)}>
								<Player src={currentSong ? currentSong.url : null} autoPlay={false} className={classes.player} />
								<PlayerControls currentIndex={currentIndex} handleCurrentIndex={handleCurrentIndex} />
							</div>
							)}
						</Media>
					</Grid>
					<Grid container item xs={12} sm={6}>
						<Playlist 
						editable={editable} draggable={editable} shareable={shareable} 
						songs={songs} setSongs={setSongs} currentIndex={currentIndex}
						handleCurrentIndex={handleCurrentIndex} setChanged={setChanged} />
					</Grid>
				</Grid>
				
				<Grid container 
					direction="row"
					justify="center"
					alignItems="center"
					spacing={1}
					className={classes.descriptionBox}>
					<Grid item xs={1} container direction="column" alignItems="center">
						<Grid container item xs={12} direction="row" alignItems="center">
							<Grid item xs={6}><Button disabled><VisibilityIcon className={classes.icon}/></Button> </Grid>
							<Grid item xs={6}><Typography>{viewCount}</Typography></Grid>
						</Grid>
						<Grid container item xs={12} direction="row" alignItems="center">
							<Grid item xs={6}>
								<Button onClick={handleLike}>
									{ liked ? <FavoriteIcon className={classes.icon} /> : <FavoriteBorderIcon className={classes.icon} />}
								</Button></Grid>
							<Grid item xs={6}><Typography>{likeCount}</Typography></Grid>
						</Grid>
						{ editable ?
						<Grid container item xs={12} direction="row" alignItems="center">
							<FormControlLabel
							control={<Switch checked={checkedPublic} onChange={handleCheckedPublic} name="checkedPublic" />}
							label="Public" labelPlacement="start"
							/>
						</Grid> : null }
					</Grid>
					<Grid item xs={1}>
						<Avatar variant="rounded" className={classes.profileImg} src={profileImage}></Avatar>
					</Grid>
					<Grid item xs={2}  
						container
						direction="column"
						justify="center"
						alignItems="flex-start"
						className={classes.playlistAuthor}>
						
						{editable ? 
						<TextField
						variant="outlined"
						margin="normal"
						id="playlistTitle"
						label="Playlist Title"
						name="playlistTitle"
						value={playlistName}
						onChange={playlistNameChange}
						/>
						:
						<Grid item xs={12}> <Typography variant="h4">{playlistName}</Typography> </Grid>
						}
						<Grid item xs={12}> <Typography variant="h6">{`By ${playlistAuthor}`}</Typography> </Grid>
					</Grid>
					<Grid item xs={8} className={classes.playlistDescription}>
						{editable ? 
						<TextField
						fullWidth
						multiline
						rows={5}
						variant="outlined"
						margin="normal"
						id="playlistDescription"
						label="Playlist Description"
						name="playlistDescription"
						value={description}
						onChange={descriptionChange}
						/>
						:
						<Typography variant="h6">{description}</Typography>
						}
					</Grid>
				</Grid>
				{error ? <div className={classes.loginError}>{errorMsg}</div> : null}
				<Grid
					container
					justify="space-between"
					alignItems="center"
					direction="column"
					className={classes.commentSection}
					fullWidth>
					<Box
						className={classes.commentBox}>
						{
							comments.map(({message, user, timestamp}, index) => {
								return( 
								<Grid
									container 
									xs={12}
									direction="column"
									justify="flex-start"
									alignItems="flex-start"
									spacing={0}
									className={classes.comment}>
									<Grid item xs={12}>
										<Typography disableTypography className={classes.messageText}>
										<Link>{user}</Link>{`: ${message}`}</Typography>
									</Grid>
									<Grid item xs={12}>
										<Typography disableTypography className={classes.messageTS}>{timestamp}</Typography>
									</Grid>
								</Grid>
								);
							})
						}
					</Box>
					<Grid
						container
						justify="center"
						alignItems="center"
						className={classes.makeCommentSection}
						xs={11}
						>
						<Grid item xs={11} >
							<TextField
								variant="outlined"
								fullWidth
								name="send-message"
								label="Enter a message"
								type="text"
								multiline={true}
								rows={2}
								id="send-message"
								className={classes.enterComment}
								/>
						</Grid>
						<Grid item xs={1}>
							<Button variant="contained" className={classes.sendMessageButton}>
								<SendIcon className={classes.sendMsgIcon}/>
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Dialog>
		</div>
	);
}

export default ViewPlaylist;