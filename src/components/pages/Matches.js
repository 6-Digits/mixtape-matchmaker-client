import React, { useState, useEffect} from "react";
import {Box, Container, Grid, Typography, InputBase, IconButton, TextField, GridList, Button} from '@material-ui/core';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import ReactPlayer from 'react-player/youtube';
import Sidebar from '../navbar/Sidebar';
import Draggable from 'react-draggable';
import Playlist from "../modules/Playlist";
 
function Matches(props) {
	const [width, setWidth] = useState(0);
	useEffect(() => {
		function updateWidth() {
		  setWidth(window.innerWidth);
		}
		window.addEventListener('resize', updateWidth);
		updateWidth();
		return () => window.removeEventListener('resize', updateWidth);
	  }, []);
	let useStyles = makeStyles((theme) => ({
		form: {
		  width: '100%'
		},
		submit: {
		  margin: theme.spacing(3, 0, 2),
		  fontWeight: "bold",
		  fontFamily: "Arial Black"
		},
		headerButton: {
			fontSize: 2.5	 + 'rem'
		},
		content: {
			marginTop: "1rem"
		},
		fullHeight: {
			height: "100%"
		}
	}));
	let classes = useStyles();
	return (
		<div style={{height: width > 598 ? "100vh" : "100%"}}>
			<Sidebar pageName='My Matches'></Sidebar>
			<Grid
				container
				direction="row"
				justify="center"
				alignItems="center"
				fullWidth
			>
				<Grid 
					container
					direction="column"
					justify="space-evenly"
					alignItems="center"
					item xs={12} sm={5}
					spacing={1}
					className={classes.content}>
					<Grid container item xs={12} sm={11}>	
						<ReactPlayer className={classes.player} url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
					</Grid>
					<Grid container item xs={12} sm={11} spacing={1}
						direction="column"
						justify="space-evenly"
						alignItems="center">	
						<Grid container item xs={12} fullWidth>
							<Button className={classes.submit} variant="contained" fullWidth color="inherit">{"Match Settings"}</Button>
						</Grid>
						<Grid container item xs={12} fullWidth>
							<Button className={classes.submit} variant="contained" fullWidth color="secondary">{"Go Match"}</Button>
						</Grid>
						<Grid container item xs={12} fullWidth>
							<Button className={classes.submit} variant="contained" fullWidth color="primary">{"View Matches"}</Button>
						</Grid>
					</Grid>
				</Grid>
				<Grid container item xs={12} sm={5}>
					<Playlist title="My Match Playlist" editable={true}/>
					<Grid
						container
						direction="column"
						justify="space-evenly"
						alignItems="center"
						spacing={4}
						>
							
						<Grid container item xs={12} spacing={3}>	  
							<TextField 	
							fullWidth
							id="playlist-title" 
							label="Title of Match Playlist" 
							variant="outlined" />
						</Grid>

						<Grid container item xs={12} spacing={3}>
							<TextField 
							fullWidth
							id="playlist-desc" 
							label="Description of Match Playlist" 
							multiline
							rows={8}
							variant="outlined" />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}

export default Matches;