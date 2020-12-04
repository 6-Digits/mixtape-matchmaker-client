import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Dialog, DialogActions, Button, DialogTitle, Typography, Grid } from '@material-ui/core';
import { NavigateBefore as NavigateBeforeIcon, NavigateNext as NavigateNextIcon } from '@material-ui/icons';
import { Media, Player, utils } from 'react-media-player'
import Playlist from "../modules/Playlist";
import PlayerControls from "./PlayerControls";
import heart from "../../assets/heart.png";
import heartBreak from "../../assets/heart_break.png";
import placeholder from "../../assets/placeholder.png";

const { keyboardControls } = utils;

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
		textAlign: "center",
		marginTop: "1rem"
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
		width: "98%",
		margin: "1rem"
	},
	likeImg: {
		width: '10vh',
		height: '10vh'
	},
	playlistTitle: {
		textAlign: "center",
		marginTop: "1rem"
	},
	likeButton: { 
		marginTop: '1rem',
		backgroundColor: theme.palette.background.default
	},
	description: {
		height: '20vh',
		overflowY: 'auto',
		backgroundColor: theme.palette.background.paper,
		padding: '0.5rem',
		borderRadius: '0.25rem',
		marginTop: '1rem'
	},
	leftCard: {
		padding: "1rem",
		borderRadius: '0.5rem',
		backgroundColor: theme.palette.background.default,
	},
	rightCard: {
		padding: "0 1rem 0 1rem"
	},
	media: {
		position: 'relative',
		height: '100%',
		width: '100%',
		marginTop: '1rem'
	},
	player: {
		display: 'none'
	},
}));
  
function GoMatch(props) {
	const classes = useStyles();
	const [matchIndex, setMatchIndex] = useState(false);
	const [open, setOpen] = useState(false);
	const [changed, setChanged] = useState(false);
	const [songs, setSongs] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentSong, setCurrentSong] = useState(songs ? songs[currentIndex] : null);
	const [autoPlay, setAutoPlay] = useState(false);
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [matchAvailable, setMatchAvailable] = useState(true);
  
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
				{ matchAvailable ? 
				<Grid
				container
				direction="row"
				justify="space-between"
				alignItems="flex-start"
				className={classes.content}
				>
					<Grid container 
						direction="column" item xs={4}
						className={classes.leftCard}>
						<Grid item>
							<Typography variant="h3">History of Meme Songs</Typography> 
						</Grid>
						
						<Grid item className={classes.description}>
							<Typography variant="h6">I hope my classicist friends will forgive me if I abbreviate ‘mimeme’ to ‘meme.’" (The suitable Greek root was mim-, meaning "mime" or "mimic." The English suffix -eme indicates a distinctive unit of language structure, as in "grapheme," "lexeme," and "phoneme.") "Meme" itself, like any good meme, caught on fairly quickly, spreading from person to person as it established itself in the language.</Typography>
						</Grid>
						<Grid item>
							<Avatar variant="rounded" className={classes.profileImg} src={"https://i.kym-cdn.com/entries/icons/original/000/029/079/hellothere.jpg"}></Avatar>
						</Grid>
						<Grid item>
							<Typography variant="h3" className={classes.profileName}>Obi Wan Kenobi</Typography>
						</Grid>
					</Grid>
					<Grid container 
						direction="column" item xs={8}
						className={classes.rightCard}>
						<Grid item>
							<Playlist title="" importable={false} editable={false} draggable={false} notSharable={true}
									songs={songs} setSongs={setSongs} currentIndex={currentIndex} handleCurrentIndex={handleCurrentIndex}
									playlistID={"OOOOGGGBOOOGGGAAAAOOOOOOGGGGAAAA"}/>
						</Grid>
						<Grid item>
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
						<Grid container direction="row" justify="space-evenly" alignItems="center">
							<Button variant="contained" className={classes.likeButton}><NavigateBeforeIcon color="primary" className={classes.likeImg}></NavigateBeforeIcon></Button>
							<Button variant="contained" className={classes.likeButton}><Avatar className={classes.likeImg} src={heart} variant="rounded"></Avatar></Button> 
							<Button variant="contained" className={classes.likeButton}><Avatar className={classes.likeImg} src={heartBreak} variant="rounded"></Avatar></Button>
							<Button variant="contained" className={classes.likeButton}><NavigateNextIcon color="primary" className={classes.likeImg}></NavigateNextIcon></Button>

						</Grid>
					</Grid>
				</Grid> 
				: 
				<Grid
				container
				direction="row"
				justify="space-between"
				alignItems="center"
				className={classes.content}>

				</Grid>	}
			</Dialog>
		</div>
	);
}

export default GoMatch;