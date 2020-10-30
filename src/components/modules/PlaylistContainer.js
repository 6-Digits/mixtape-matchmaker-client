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
	},
	playlistsContainer: {
		padding: theme.spacing(2, 0, 2, 3),
	},
}));

function PlaylistContainer(props) {
	const classes = useStyles();
	
	const height = props.height ? props.height : 700;
	const playlists = props.playlists ? props.playlists : [];
	
	return (
		<div>
			<Paper style={{maxHeight: height}} className={classes.sectionContainer}>
				<Grid container spacing={3} className={classes.playlistsContainer}>
					{playlists.map((text, index) => (
						<Grid item xs={3}>
							<ViewPlaylist playlistName={`${text} ${index}`}></ViewPlaylist>
						</Grid>
					))}
				</Grid>
			</Paper>
		</div>
	)
}

export default PlaylistContainer;