import React, { useState, useEffect } from "react";
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Grid, Button } from "@material-ui/core"
import Sidebar from '../navbar/Sidebar';

const useStyles = makeStyles((theme)=>({
	container: {
		padding: '5vh 10vh 10vh 10vh',
	},
	popular: {
		margin: '5vh 10vh 10vh 10vh',
		width: '100%',
		border: '5px solid black',
		padding: '3vh',
	},
	mixtape: {
		height: '15vh',
		width: '20vh',
		margin: '2vh 2vh 8vh 2vh',
		border: '2px solid black',
	}
}));

function Home(props) {
	const classes = useStyles();
	
	return (
		<div>
			<Sidebar pageName='Home'></Sidebar>
			
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				fullWidth
				className={classes.container}
			>
			
				Popular Playlists
				<Paper style={{maxHeight: 300, overflow: 'auto'}} className={classes.popular}>
					<Grid container spacing={0} alignItems="center" justify="center">
						{Array(100).fill('sample mixtape').map((text, index) => (
							<Grid item xs={3} alignItems="center" justify="center">
								<Grid container alignItems="center" justify="center">
									{text + ' ' + index}
								</Grid>
								<Grid container alignItems="center" justify="center">
									<Button className={classes.mixtape}>playlist</Button>
								</Grid>
							</Grid>
						))}
					</Grid>	
				</Paper>
				
				Liked Playlists
				<Paper style={{maxHeight: 300, overflow: 'auto'}} className={classes.popular}>
					<Grid container spacing={0} alignItems="center" justify="center">
						{Array(100).fill('sample mixtape').map((text, index) => (
							<Grid item xs={3} alignItems="center" justify="center">
								<Grid container alignItems="center" justify="center">
									{text + ' ' + index}
								</Grid>
								<Grid container alignItems="center" justify="center">
									<Button className={classes.mixtape}>playlist</Button>
								</Grid>
							</Grid>
						))}
					</Grid>	
				</Paper>
				
			</Grid>
		</div>
	);
}

export default Home;