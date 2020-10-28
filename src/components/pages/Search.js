import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Typography, Paper, Button, Card, CardMedia, CardContent, CardActions, ButtonBase } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import Sidebar from '../navbar/Sidebar';
import PlaylistContainer from "../modules/PlaylistContainer";

const useStyles = makeStyles((theme) => ({
	container: {
		padding: '5vh 15vh 10vh 15vh',
		display: "block",
		justifyContent: "center",
		width: "100%",
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		width: '100%',
		marginTop: '3vh',
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(2, 2, 2, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '50ch',
		},
	},
	button: {
		fontWeight: "bold",
		fontFamily: "Arial Black",
	},
	sectionContainer: {
		paddingTop: '3vh',
		margin: '5vh 0 10vh 0',
		width: '100%',
		padding: '3vh',
		backgroundColor: '#999999',
	},
	playlistsContainer: {
		padding: "20px 20px 20px 20px",
	},
	cardMedia: {
		margin: "auto",
		width: "120px", 
		height: "100px",
	},
	cardContent: {
		textAlign: "center",
	},
	cardAction: {
		display: 'block',
		textAlign: 'initial',
		margin: '2px',
	},
	title: {
		fontSize: '28pt',
	},
	query: {
		fontSize: '16pt',
	},
}));

function Search(props) {
	const classes = useStyles();
	const location = useLocation();
	
	return (
		<div>
			<Sidebar pageName='Search'></Sidebar>
			
			<Grid container direction="row" justify="center" alignItems="center" fullWidth className={classes.container}>					
					<Grid container direction="row" justify="space-between" alignItems="center">
						<Grid item xs={12} sm={6}>
							<Typography variant="h3" className={classes.title}>
								Search results for: 
							</Typography>
						</Grid>
						
						<Grid item xs={3} sm={2} spacing={2}>
							<Button variant="contained" color="primary" className={classes.button}>
								{"Sort"}
							</Button>
							<Button variant="contained" color="primary" className={classes.button}>
								{"Filter"}
							</Button>
						</Grid>
						
						<Grid item xs={12} sm={6}>
							<Typography className={classes.query}> 
								{location.query}
							</Typography>
						</Grid>
					</Grid>
					
					<PlaylistContainer height={500} playlists={Array(100).fill('search playlist')} />
					
			</Grid>
		</div>
	);
}

export default Search;