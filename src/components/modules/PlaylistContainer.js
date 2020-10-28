import React, { useState, useEffect } from "react";
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Grid, Button, Typography, Card, CardMedia, CardContent, CardActions, ButtonBase } from "@material-ui/core"
import logo from "../../assets/logo.png";

const useStyles = makeStyles((theme)=>({
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
		height: "80px",
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

function PlaylistContainer(props) {
	const classes = useStyles();
	
	return (
		<div>
			<Paper style={{maxHeight: props.height, overflow: 'auto'}} className={classes.sectionContainer}>
				<Grid container spacing={2} className={classes.playlistsContainer}>
					{props.playlists.map((text, index) => (
						<Grid item xs={3}>
							<Card>
								<ButtonBase className={classes.cardAction} onClick={event => {}}>
									<CardMedia className={classes.cardMedia} image={logo} />
									<CardContent className={classes.cardContent}>
										<Typography>{`${text} ${index}`}</Typography>
									</CardContent>
								</ButtonBase>
							</Card>
						</Grid>
					))}
				</Grid>
			</Paper>
		</div>
	)
}

export default PlaylistContainer;