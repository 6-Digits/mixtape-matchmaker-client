import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Dialog, DialogActions, Button, DialogTitle, Typography, Grid } from '@material-ui/core';
import { Media, Player, utils } from 'react-media-player'
import Playlist from "../modules/Playlist";
import PlayerControls from "./PlayerControls";
import heart from "../../assets/heart.png";
import heartBreak from "../../assets/heart_break.png";
import playlistData from '../data/playlist.json';

const { keyboardControls } = utils;
const importedSongs = playlistData['songs'];

const useStyles = makeStyles((theme) => ({
	container: {
		width:"100%",
		height:"100%"
	},
	button: {
		margin: theme.spacing(3, 0, 2),
		fontWeight: "bold",
		fontFamily: "Arial Black",
		fontSize: "1.5rem"
	},
	profileName: {
		textAlign: "center"
	},
	profileImg: {
		marginTop: '1rem',
		width: '30vh',
		height: '30vh',
		margin: 'auto'
	},
	modal: {
		margin: 'auto',
	},
	modalTitle: {
		fontSize: "3rem",
		fontWeight: "bold"
	},
	content: {
		padding: "1rem 1rem 1rem 1rem",
		borderRadius: '0.5rem',
		backgroundColor: theme.palette.background.default,
		width: "95%",
		margin: "auto"

	},
	likeImg: {
		width: '10vh',
		height: '10vh'
	},
	playlistTitle: {
		textAlign: "center"
	},
	likeButton: { 
		marginTop: '1rem',
	},
	description: {
		height: '20vh',
		overflowY: 'auto'
	},
	media: {
		position: 'relative',
		height: '100%',
		width: '100%',
	},
	player: {
		width: '100%',
		height: '100%',
		marginTop: '1rem',
		marginBottom: '1rem'
	},
}));
  
function GoMatch(props) {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [songs, setSongs] = useState(importedSongs);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentSong, setCurrentSong] = useState(songs[currentIndex]);
  
	const handleOpen = () => {
		setOpen(true);
	};
  
	const handleClose = () => {
		setOpen(false);
	};
	
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
		<div className={classes.container}>
			<Button className={classes.button} onClick={handleOpen}  variant="contained" fullWidth color="secondary">{"Go Match"}</Button>
			<Dialog 
				fullWidth={true}
				maxWidth="xl" className={classes.modal} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
				
				<Grid container direction="row" justify="space-between" alignItems="center">
					<Grid item xs={12} sm={6}>
						<DialogTitle disableTypography id="form-dialog-title" className={classes.modalTitle}>Go Match</DialogTitle>
					</Grid>

					<Grid item xs={12} sm={1} className={classes.importGrid}>
						<DialogActions>
							<Button variant="contained" onClick={handleClose} color="secondary" className={classes.cancel}>
								Exit
							</Button>
						</DialogActions>
					</Grid> 
				</Grid>
				
				<Grid
				container
				direction="row"
				justify="space-between"
				alignItems="center"
				className={classes.content}
				xs={12}
				>
					<Grid container 
						direction="column" item xs={4}>
						<Grid item>
							<Typography variant="h3" className={classes.profileName}>Obi Wan Kenobi</Typography>
						</Grid>
						<Grid item>
							<Avatar variant="rounded" className={classes.profileImg} src={"https://i.kym-cdn.com/entries/icons/original/000/029/079/hellothere.jpg"}></Avatar>
						</Grid>
						<Grid item>
							<Media>
								{mediaProps => (
								<div className={classes.media} onKeyDown={keyboardControls.bind(null, mediaProps)}>
									<Player src={currentSong.src} autoPlay={true} className={classes.player} />
									<PlayerControls currentIndex={currentIndex} handleCurrentIndex={handleCurrentIndex} />
								</div>
								)}
							</Media>
						</Grid>
					</Grid>
					<Grid container 
						direction="column" item xs={6}>
						<Grid item>
							<Typography variant="h3">History of Meme Songs</Typography> 
						</Grid>
						
						<Grid item className={classes.description}>
							<Typography variant="h6">I hope my classicist friends will forgive me if I abbreviate ‘mimeme’ to ‘meme.’" (The suitable Greek root was mim-, meaning "mime" or "mimic." The English suffix -eme indicates a distinctive unit of language structure, as in "grapheme," "lexeme," and "phoneme.") "Meme" itself, like any good meme, caught on fairly quickly, spreading from person to person as it established itself in the language.</Typography>
						</Grid>
						<Grid item>
							<Playlist songs={importedSongs} currentIndex={currentIndex} handleCurrentIndex={handleCurrentIndex} />
						</Grid>
						<Grid container direction="row" justify="space-evenly" alignItems="center">
							<Button variant="contained" className={classes.likeButton}><Avatar className={classes.likeImg} src={heart} variant="rounded"></Avatar></Button> 
							<Button variant="contained" className={classes.likeButton}><Avatar className={classes.likeImg} src={heartBreak} variant="rounded"></Avatar></Button>
						</Grid>
					</Grid>
				</Grid>
			</Dialog>
		</div>
	);
}

export default GoMatch;