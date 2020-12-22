import React, { useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Grid } from "@material-ui/core"
import ViewPlaylist from "../modals/ViewPlaylist";

const useStyles = makeStyles((theme) => ({
	sectionContainer: {
		marginTop: '1rem',
		borderRadius: "0.25rem",
		backgroundColor: theme.palette.background.default,
		overflowY: "auto",
		width: '100%',
		padding: '1rem'
	},
	playlistsContainer: {
	},
}));

function PlaylistsContainer({height, editable, playlists, fetchPlaylists, user, removePlaylist, setPlaylists, sendNotification, notHome, screenWidth}) {
	const classes = useStyles();
	
	height = height ? height : 800;
	
	useEffect(() => {
		let userToken = localStorage.getItem('userToken');
		if(userToken && user){
			fetchPlaylists(userToken, user);
		} 
	}, []);
	
	return (
		<div>
			<Paper className={classes.sectionContainer} style={{height: notHome ? '73vh' : '37vh'}}>
				<Grid container spacing={2} className={classes.playlistsContainer}>
					{playlists.map((playlist) => (
						<Grid item xs={3}>
							<ViewPlaylist 
								playlist={playlist} editable={editable} fetchPlaylists={fetchPlaylists} 
								user={user} removePlaylist={removePlaylist} setPlaylists={setPlaylists} 
								playlists={playlists} sendNotification={sendNotification} screenWidth={screenWidth} />
						</Grid>
					))}
				</Grid>
			</Paper>
		</div>
	)
}

export default PlaylistsContainer;