import React, { useState } from "react";
import { Grid, Typography, Card, Button, Avatar, CardActionArea } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText} from '@material-ui/core';

import heartBreak from "../../assets/heart_break.png";

function MatchChatCard({recipient, index, currentIndex, handleCurrentIndex, unMatch}) {
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
		},
		button: {
			fontWeight: 'bold'
		}
	}));
	const classes = useStyles();
	const [deleteOpen, setDeleteOpen] = useState(false);
	
	const handleOpenDeleteDialog = () => {
		setDeleteOpen(true);
	};
	
	const handleCloseDeleteDialog = () => {
		setDeleteOpen(false);
	};
	
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
					<Button variant="contained" className={classes.dislikeButton} onClick={handleOpenDeleteDialog}>
						<Avatar className={classes.dislikeImg} src={heartBreak} variant="rounded" />
					</Button>
				</Grid>
			</Grid>
			<Dialog open={deleteOpen} onClose={handleCloseDeleteDialog} aria-labelledby="form-dialog-title">
					<DialogTitle id="form-dialog-title" >Confirm Delete Match</DialogTitle>
					<DialogContent>
						<DialogContentText>
							{`Are you sure about unmatching with '${recipient.userName}'?`}
						</DialogContentText>
					</DialogContent>
					<DialogActions>
					<Button onClick={handleCloseDeleteDialog} color="secondary" className={classes.button}
				variant="contained">
						Cancel
					</Button>
					<Button onClick={() => {unMatch(index)}} color="primary" className={classes.button}
				variant="contained">
						Yes, please delete this playlist
					</Button>
					</DialogActions>
				</Dialog>
		</Card>
	);
}

export default MatchChatCard;