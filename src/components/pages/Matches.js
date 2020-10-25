import React, { useState, useEffect } from "react";
import {Box, Container, Grid, Typography} from '@material-ui/core';
import ReactPlayer from 'react-player/youtube'
 

function Matches(props) {
	return (
		<Grid
			container
			direction="row"
			justify="center"
			alignItems="center"
		>
			<div>
				<ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
			</div>
			<div>
				<Typography variant="h2">
					My Match Playlist
				</Typography>
			</div>
		</Grid>
	);
}

export default Matches;