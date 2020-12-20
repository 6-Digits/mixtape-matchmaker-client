import React, {  } from "react";
import { Grid, Typography, Card, Button, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PlayCircleOutline as PlayCircleOutlineIcon, Delete as DeleteIcon } from '@material-ui/icons';
import placeholder from "../../assets/placeholder.png";

function PlaylistSongCard({index, editable, song, author, duration, img, currentIndex, handleCurrentIndex, deleteSong, uuid, setAutoPlay}) {
	const useStyles = makeStyles((theme) => ({
		card: {
			backgroundColor: index === currentIndex ? theme.palette.primary.dark : theme.palette.background.paper,
			color: theme.palette.text.primary,
			textAlign: "center",
			fontWeight: "bold",
		},
		fullSize: {
			height: '100%',
			width: '100%'
		},
		playSongButton: {
			height: '10vh',
			width: '100%'
		},
		songImg: {
			height: '10vh',
			width: '80%'
		},
		songDetails: {
			textAlign: "left",
			height:"100%",
		},
		playIcon: {
			height: '5vh',
			width: '5vh'
		},
		deleteIcon: {
			height: '5vh',
			width: '5vh'
		},
		duration: {
	
		},
		order: {
	
		}
	}));
	const classes = useStyles();
	duration = parseInt(duration, 10);
	img = img ? img : placeholder;

	const handlePlay = () => {
		setAutoPlay(true);
		handleCurrentIndex(index);
	}
	
	const handleDelete = () => {
		setAutoPlay(false);
		deleteSong(uuid);
		handleCurrentIndex(currentIndex);
	}
	
	return (
		<Card className={classes.card}>
			<Grid container direction="row" justify="space-between" alignItems="center">
				<Grid item xs={6} sm={2}>
					<Button variant="text" className={classes.playSongButton} onClick={handlePlay}>
						<PlayCircleOutlineIcon className={classes.playIcon} />
					</Button>
				</Grid>
				<Grid item xs={6} sm={2}>
					<Avatar variant="square" src={img} className={classes.songImg} />
				</Grid>
				
				<Grid item xs={12} sm={5} className={classes.songDetails}>
					<Typography variant="h4">{ song }</Typography>
					<Typography>{ author }</Typography>
					{/* <Typography>{ genre.slice(0, 3).join(', ') }</Typography> */}
				</Grid>
				
				{ editable ?
				<Grid item xs={6} sm={1}>
					<Button onClick={handleDelete} variant="text" className={classes.deleteSongButton}>
						<DeleteIcon className={classes.deleteIcon} />
					</Button>
				</Grid> : null
				}
				
				<Grid item xs={6} sm={2} className={classes.duration}>
					<Typography variant="h4">{ `${Math.floor(duration / 60)}:${ duration % 60 > 10 ? duration % 60 : '0' + duration % 60}` }</Typography>
				</Grid>
			</Grid>
		</Card>
	);
}

export default PlaylistSongCard;