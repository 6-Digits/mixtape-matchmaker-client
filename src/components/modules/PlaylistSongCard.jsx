import React, {  } from "react";
import { Grid, Typography, Card, Button, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { PlayCircleOutline as PlayCircleOutlineIcon, Delete as DeleteIcon } from '@material-ui/icons';
import placeholder from "../../assets/placeholder.png";

function PlaylistSongCard({index, editable, song, author, duration, img, currentIndex, handleCurrentIndex, deleteSong, uuid, setAutoPlay, screenWidth}) {
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
			height: '6.5rem',
			width: '100%'
		},
		songImg: {
			height: '6.5rem',
			width: '90%'
		},
		songDetails: {
			textAlign: "left",
			height:"100%",
		},
		playIcon: {
			height: '5rem',
			width: '100%'
		},
		deleteIcon: {
			height: '6.5rem',
			width: '100%'
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
				<Grid item xs={2} container>
					<Button variant="text" className={classes.playSongButton} onClick={handlePlay}>
						<PlayCircleOutlineIcon className={classes.playIcon} />
					</Button>
				</Grid>
				<Grid item xs={2} container>
					<Avatar variant="square" src={img} className={classes.songImg} />
				</Grid>
				
				<Grid item xs={4} className={classes.songDetails} direction="column" container>
					<Typography variant={screenWidth > 900 ? 'h4' : screenWidth > 600 ? 'h5' : 'h6'}>{ song }</Typography>
					<Typography>{ author }</Typography>
					{/* <Typography>{ genre.slice(0, 3).join(', ') }</Typography> */}
				</Grid>
				
				{ editable ?
				<Grid item xs={2} container>
					<Button onClick={handleDelete} variant="text" className={classes.deleteSongButton}>
						<DeleteIcon className={classes.deleteIcon} />
					</Button>
				</Grid> : null
				}
				
				<Grid item xs={2} className={classes.duration} container>
					<Typography variant={screenWidth > 900 ? 'h4' : screenWidth > 600 ? 'h5' : 'h6'}>{ `${Math.floor(duration / 60)}:${ duration % 60 > 10 ? duration % 60 : '0' + duration % 60}` }</Typography>
				</Grid>
			</Grid>
		</Card>
	);
}

export default PlaylistSongCard;