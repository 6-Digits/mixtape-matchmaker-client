import React, { useState, useEffect } from "react";
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Grid, Button, Typography } from "@material-ui/core"
import NavigationBar from '../modules/NavigationBar';
import PlaylistContainer from "../modules/PlaylistContainer";

const useStyles = makeStyles((theme)=>({
	mainContainer: {
		padding: '5vh 20vh 10vh 20vh',
		display: "block",
		justifyContent: "center",
		width: "100%",
	},
	title: {
		fontSize: '28pt',
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
	}
}));

function Home(props) {
	const classes = useStyles();
	
	return (
		<div>
			<NavigationBar pageName='Home'></NavigationBar>
			
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				fullWidth
				className={classes.mainContainer}
			>
				
				<Typography variant="h3" className={classes.title}>
					Popular Playlists
				</Typography>
				
				<PlaylistContainer height={500} playlists={Array(100).fill('popular playlist')} />
				
				<Typography variant="h3" className={classes.title}>
					Liked Playlists
				</Typography>
				
				<PlaylistContainer height={500} playlists={Array(100).fill('liked playlist')} />
				
			</Grid>
		</div>
	);
}

export default Home;