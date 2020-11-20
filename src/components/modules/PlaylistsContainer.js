import React, { useState, useEffect } from "react";
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Grid } from "@material-ui/core"
import ViewPlaylist from "../modals/ViewPlaylist";

const useStyles = makeStyles((theme) => ({
	sectionContainer: {
		padding: theme.spacing(1, 0, 1, 0),
		margin: theme.spacing(3, 0, 3, 0),
		borderRadius: "0.25rem",
		backgroundColor: theme.palette.text.disabled,
		overflowY: "auto",
		width: '100%',
		height: '60vh'
	},
	playlistsContainer: {
		padding: theme.spacing(2, 0, 2, 3),
	},
}));

function PlaylistsContainer({height, editable, playlists, fetchPlaylists, user, removePlaylist, setPlaylists}) {
	const classes = useStyles();
	
	height = height ? height : 800;
	
	useEffect(() => {
		// let userToken = JSON.parse(cookies.get('userToken'));
		// let userToken = cookies['userToken'];
		let userToken = localStorage.getItem('userToken');
		if(userToken && user){
			fetchPlaylists(userToken, user);
		} 
	  }, []);
	
	return (
		<div>
			<Paper style={{maxHeight: height}} className={classes.sectionContainer}>
				<Grid container spacing={3} className={classes.playlistsContainer}>
					{playlists.map((playlist, index) => (
						<Grid item xs={3}>
							<ViewPlaylist 
								playlist={playlist} editable={editable} fetchPlaylists={fetchPlaylists} 
								index={index} user={user} removePlaylist={removePlaylist}
								setPlaylists={setPlaylists}
								playlists={playlists}
								key={playlist['_id']}></ViewPlaylist>
						</Grid>
					))}
				</Grid>
			</Paper>
		</div>
	)
}

export default PlaylistsContainer;