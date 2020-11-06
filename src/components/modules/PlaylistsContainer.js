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

function PlaylistsContainer({height, playlists}) {
	const classes = useStyles();
	
	height = height ? height : 700;
	playlists = playlists ? playlists : [];
	
	return (
		<div>
			<Paper style={{maxHeight: height}} className={classes.sectionContainer}>
				<Grid container spacing={3} className={classes.playlistsContainer}>
					{playlists.map(x => (
						<Grid item xs={3}>
							<ViewPlaylist playlistName={x.title} thumbnail={x.thumbnail} editable={x.editable} shareable={true}></ViewPlaylist>
						</Grid>
					))}
				</Grid>
			</Paper>
		</div>
	)
}

export default PlaylistsContainer;