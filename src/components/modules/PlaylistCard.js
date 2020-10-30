import React, { useState, useEffect } from "react";
import { Grid, Typography, Card, Button, Avatar, useRadioGroup } from '@material-ui/core';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import { PlayCircleOutline as PlayCircleOutlineIcon, Delete as DeleteIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	card: {
		backgroundColor: theme.palette.background.paper,
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

function PlaylistCard({order, editable, song, author, genre, duration, img, src}) {
	src = src ? src : "https://compote.slate.com/images/fb3403a0-6ffc-471a-8568-b0f01fa3bd6b.jpg";
	
	const classes = useStyles();
	return (
		<Card className={classes.card}>
			<Grid container direction="row" justify="space-between" alignItems="center">
				<Grid item xs={6} sm={2}>
					<Button variant="text" className={classes.playSongButton}>
						<PlayCircleOutlineIcon className={classes.playIcon} />
					</Button>
				</Grid>
				<Grid item xs={6} sm={2}>
					<Avatar variant="square" src={src} className={classes.songImg} />
				</Grid>
				
				<Grid item xs={12} sm={5} className={classes.songDetails}>
					<Typography variant="h4">{ song }</Typography>
					<Typography>{ author }</Typography>
					<Typography>{ genre }</Typography>
				</Grid>
				
				{ editable ?
				<Grid item xs={6} sm={1}>
					<Button variant="text" className={classes.deleteSongButton}>
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

export default PlaylistCard;