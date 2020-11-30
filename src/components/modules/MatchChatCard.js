import React, { useState, useEffect } from "react";
import { Grid, Typography, Card, Button, Avatar, CardActionArea } from '@material-ui/core';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import heartBreak from "../../assets/heart_break.png";

const useStyles = makeStyles((theme) => ({
	card: {
		backgroundColor: theme.palette.background.paper,
		color: theme.palette.text.primary,
		textAlign: "center",
		fontWeight: "bold",
	},
	fullSize: {
		height: '100%',
		width: '100%'
	},
	profileImg: {
		height:"10vh",
		width:"100%"
	},
	profileName: {
		width: "100%",
		height: "100%"
	},
	dislikeButton: {
		backgroundColor: theme.palette.background.default
	},
	dislikeImg: {

	},
	content: {

	},
	clickArea: {
		width: "100%",
		height: "100%"
	}
}));

function MatchChatCard({name, src}) {
	const classes = useStyles();
	
	src = src ? src : "https://em.wattpad.com/e4221541680f315f5ae6be4e68a4849b66f9edc6/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f563465566c7463467142753963513d3d2d3537383031383537372e313533306363663163386637343662623638393430393337353532302e676966";
	
	return (
		<Card className={classes.card}>
			<Grid container direction="row" justify="space-between" alignItems="center" className={classes.content}>
				<Grid item xs={12} sm={9}>
					<CardActionArea className={classes.clickArea}>
						<Grid container alignItems="center">
							<Grid item xs={12} sm={5}>
								<Avatar variant="rounded" src={src} className={classes.profileImg}></Avatar>
							</Grid>
							<Grid item xs={12} sm={7}>
								<Typography variant="h6" className={classes.profileName}>{name}</Typography>
							</Grid>
						</Grid>
					</CardActionArea>
				</Grid>
				<Grid item xs={12} sm={3}>
					<Button variant="contained" className={classes.dislikeButton}><Avatar className={classes.dislikeImg} src={heartBreak} variant="rounded"></Avatar></Button>
				</Grid>
			</Grid>
		</Card>
	);
}

export default MatchChatCard;