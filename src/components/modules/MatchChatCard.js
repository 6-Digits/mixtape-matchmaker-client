import React, { useState, useEffect } from "react";
import { Grid, Typography, Card, Button, Avatar, CardActionArea } from '@material-ui/core';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import heartBreak from "../../assets/heart_break.png";

function MatchChatCard({id, recipient, index, currentIndex, handleCurrentIndex}) {
	const useStyles = makeStyles((theme) => ({
		card: {
			backgroundColor: index === currentIndex ? theme.palette.primary.dark : theme.palette.background.paper,
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
	const classes = useStyles();
	
	const handleClick = () => {
		handleCurrentIndex(index)
	}
		
	return (
		<Card className={classes.card} >
			<Grid container direction="row" justify="space-between" alignItems="center" className={classes.content}>
				<Grid item xs={12} sm={9}>
					<CardActionArea className={classes.clickArea} onClick={handleClick}>
						<Grid container alignItems="center" >
							<Grid item xs={12} sm={5}>
								<Avatar variant="rounded" src={recipient.imgSrc} className={classes.profileImg} />
							</Grid>
							<Grid item xs={12} sm={7}>
								<Typography variant="h6" className={classes.profileName}>{recipient.userName}</Typography>
							</Grid>
						</Grid>
					</CardActionArea>
				</Grid>
				<Grid item xs={12} sm={3}>
					<Button variant="contained" className={classes.dislikeButton}>
						<Avatar className={classes.dislikeImg} src={heartBreak} variant="rounded" />
					</Button>
				</Grid>
			</Grid>
		</Card>
	);
}

export default MatchChatCard;