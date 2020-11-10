import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Dialog, DialogActions, Button, DialogTitle, Typography, Grid, Container, TextField, Box, Link, Card, ButtonBase, CardMedia, CardContent, FormControlLabel, Switch } from '@material-ui/core';
import { FavoriteBorder as FavoriteBorderIcon, Visibility as VisibilityIcon, Send as SendIcon } from '@material-ui/icons';
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
		maxHeight: 180,
	},
	cardContent: {
		textAlign: "left",
	},
	cardAction: {
		display: 'block',
		maxWidth: 300,
		maxHeight: 250,
	}
}));

const defaultDesc = 'I hope my classicist friends will forgive me if I abbreviate ‘mimeme’ to ‘meme.’" (The suitable Greek root was mim-, meaning "mime" or "mimic." The English suffix -eme indicates a distinctive unit of language structure, as in "grapheme," "lexeme," and "phoneme.") "Meme" itself, like any good meme, caught on fairly quickly, spreading from person to person as it established itself in the language.';

function ViewPlaylist({editable, shareable, playlist, updatePlaylists}) {
	const importedSongs = playlist ? playlist['songList'] : playlistData['songs'];
	const importedDesc = playlist ? playlist['description'] : defaultDesc;
	const importedThumbnail = playlist ?  playlist['songList'] ? playlist['songList'][0] ? playlist['songList'][0]['imgUrl'] : placeholder : placeholder : placeholder;
	const importedLikeCount = playlist ? playlist['hearts'] : 420;
	const importedComments = playlistData['comments'];
	const importedViewCount = playlist ? playlist['view'] : 2020;
	const importedAuthor = playlist ? playlist['owner'] : "X Æ A-13";
	const importedName = playlist ? playlist['name'] : "Ayyy Lmao";

	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [checkedPublic, setCheckedPublic] = useState(true);
	const [description, setDescription] = useState(importedDesc);
	const [viewCount, setViewCount] = useState(importedViewCount);
	const [likeCount, setLikeCount] = useState(importedLikeCount);
	const [thumbnail, setThumbnail] = useState(importedThumbnail);
	const [playlistName, setPlaylistName] = useState(importedName);
	const [playlistAuthor, setPlaylistAuthor] = useState(importedAuthor);
	const [songs, setSongs] = useState(importedSongs);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentSong, setCurrentSong] = useState(songs[currentIndex]);
	const [comments, setComments] = useState(importedComments);
	
	shareable = editable ? editable : null;
	editable = editable ? editable : null;
	
	useEffect(() => {
		setCurrentSong(songs[currentIndex]);
		if(playlist) {
			fetchAuthor();
		}
	}, [currentIndex]);

	const fetchAuthor = () => {
		
	  };
	
	const handleOpen = () => {
		setOpen(true);
	};
	
	const handleClose = () => {
		setOpen(false);
	};
	
	const handleCheckedPublic = (event) => {
		setCheckedPublic(event.target.checked);
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
	
	return (
		<div className={classes.container}>
			<Card className={classes.root}>
				<ButtonBase className={classes.cardAction} onClick={handleOpen}>
					<CardMedia component='img' className={classes.cardMedia} image={thumbnail} />
					<CardContent className={classes.cardContent}>
						<Typography variant='h6'>{playlistName}</Typography>
					</CardContent>
				</ButtonBase>
			</Card>
			
			<Dialog fullWidth={true} maxWidth="xl" className={classes.modal} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				
				<Grid container direction="row" justify="space-between" alignItems="center">
					<Grid item xs={12} sm={6}>
						<DialogTitle disableTypography id="form-dialog-title" className={classes.modalTitle}>View Playlist</DialogTitle>
					</Grid>

					<Grid item xs={12} sm={1} className={classes.importGrid}>
						<DialogActions>
							<Button variant="contained" onClick={handleClose} color="secondary" className={classes.cancel}>
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
								<Player src={currentSong.url} autoPlay={true} className={classes.player} />
								<PlayerControls currentIndex={currentIndex} handleCurrentIndex={handleCurrentIndex} />
							</div>
							)}
						</Media>
					</Grid>
					<Grid container item xs={12} sm={6}>
						<Playlist 
						editable={editable} draggable={editable} shareable={shareable} 
						songs={importedSongs} currentIndex={currentIndex} 
						handleCurrentIndex={handleCurrentIndex} />
					</Grid>
				</Grid>
				
				<Grid container 
					direction="row"
					justify="flex-start"
					alignItems="center"
					spacing={1}
					className={classes.descriptionBox}>
					<Grid item xs={1} container direction="column" alignItems="center">
						<Grid container item xs={12} direction="row" alignItems="center">
							<Grid item xs={6}><Button disabled><VisibilityIcon className={classes.icon}/></Button> </Grid>
							<Grid item xs={6}><Typography>{viewCount}</Typography></Grid>
						</Grid>
						<Grid container item xs={12} direction="row" alignItems="center">
							<Grid item xs={6}><Button><FavoriteBorderIcon className={classes.icon}/></Button></Grid>
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
						<Avatar variant="rounded" className={classes.profileImg} src={"https://i.kym-cdn.com/entries/icons/original/000/029/079/hellothere.jpg"}></Avatar>
					</Grid>
					<Grid item xs={2}  
						container
						direction="column"
						justify="center"
						alignItems="center"
						className={classes.playlistAuthor}>
						
						{editable ? 
						<TextField
						variant="outlined"
						margin="normal"
						id="playlistTitle"
						label="Playlist Title"
						name="playlistTitle"
						defaultValue={playlistName}
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
						variant="outlined"
						margin="normal"
						id="playlistDescription"
						label="Playlist Description"
						name="playlistDescription"
						defaultValue={description}
						/>
						:
						<Typography variant="h6">{description}</Typography>
						}
					</Grid>
				</Grid>
				
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