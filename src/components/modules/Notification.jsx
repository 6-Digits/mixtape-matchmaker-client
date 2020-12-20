import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Collapse, Grid } from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
	message : {
		overflowX: 'auto',
		width: '100%'
	},
	container :{
		width: '100%',
		height: '100%'
	}
}));

function Notification(props) {
	const classes = useStyles();
	//const [open, setOpen] = useState(true);
	const [open] = useState(true);
	return (
		<div className={classes.root}>
			<Collapse in={open}>
				<Grid container justify="center" alignItems="center" className={classes.container}>
					<Grid item xs={2} container justify="center" alignItems="center">
						<NotificationsActiveIcon/>
					</Grid>
					<Grid item xs={8} container justify="center" alignItems="center">
						<div className={classes.message}>{props.message}</div>
					</Grid>
					<Grid item xs={2} container justify="center" alignItems="center">
						<IconButton
							aria-label="close"
							color="inherit"
							size="large"
							onClick={() => {
								props.onDelete();
							}}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
						</Grid>
				</Grid>
			</Collapse>
		</div>
	);
}

export default Notification;