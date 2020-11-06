import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography, ButtonBase, TextField, List, ListItem, ListItemText, Menu, MenuItem, Switch, Button, FormControlLabel, Card, CardMedia } from '@material-ui/core';
import NavigationBar from '../modules/NavigationBar';
import placeholder from "../../assets/placeholder.png";

const options = [
	'Male',
	'Female',
	'Machine',
	'Other',
];

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	mainContainer: {
		padding: '5vh 20vh 10vh 20vh',
		display: "flex",
		justifyContent: "auto",
		width: "100%",
	},
	paperCard: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: '100%',
		backgroundColor: theme.palette.background.default
	},
	card: {
		maxWidth: 300,
		maxHeight: 300,
		margin: theme.spacing(2),
	},
	cardMedia: {
		maxHeight: 300,
	},
	cardContent: {
		textAlign: "left",
	},
	cardAction: {
		display: 'block',
		maxWidth: 300,
		maxHeight: 300,
	},
	button: {
		fontWeight: 'bold'
	}
}));

function Settings(props) {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [state, setState] = useState({
		checkedNotifications: true,
	});

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuItemClick = (event, index) => {
		setSelectedIndex(index);
		setAnchorEl(null);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const classes = useStyles();
	return (
		<div className={classes.root}>
			<NavigationBar setUser={props.setUser} pageName='My Matches'></NavigationBar>
			
			<Paper className={classes.paper}>
				<Grid container spacing={3} className={classes.mainContainer}>
					<Grid item xs={12}>
						<Typography gutterBottom variant="h4">Public Profile</Typography>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Card className={classes.card}>
							<input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
							<ButtonBase className={classes.cardAction}>
								<label htmlFor="icon-button-file">
									<CardMedia component='img' className={classes.cardMedia} image={placeholder} />
								</label>
							</ButtonBase>
						</Card>
					</Grid>
					<Grid item xs={12} sm={9}>
						<Paper className={classes.paperCard}>
							<TextField
								variant="outlined"
								margin="normal"
								defaultValue={props.profile.userName}
								required
								fullWidth
								id="username"
								label="User Name"
								name="username"
								autoComplete="nickname"
							/>
							<TextField
								variant="outlined"
								margin="normal"
								defaultValue={props.profile.name}
								required
								fullWidth
								id="name"
								label="Name"
								name="Name"
								autoComplete="name"
							/>
							<Typography gutterBottom variant="subtitle1">
								<form className={classes.container} noValidate>
									<TextField
										id="date"
										label="Birthday"
										type="date"
										defaultValue={"1970-01-01"}
										className={classes.textField}
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</form>
							</Typography>
							<List component="nav" aria-label="Gender Menu">
								<ListItem
									button
									aria-haspopup="true"
									aria-controls="gender-menu"
									aria-label="gender"
									onClick={handleClickListItem}
								>
									<ListItemText primary="Gender" secondary={options[selectedIndex]} />
								</ListItem>
							</List>
							<Menu
								id="gender-menu"
								anchorEl={anchorEl}
								keepMounted
								open={Boolean(anchorEl)}
								onClose={handleClose}
							>
								{options.map((option, index) => (
									<MenuItem
										key={option}
										selected={index === selectedIndex}
										onClick={(event) => handleMenuItemClick(event, index)}
									>
										{option}
									</MenuItem>
								))}
							</Menu>
						</Paper>
					</Grid>
					<Grid item xs={12}>
						<Typography gutterBottom variant="h4">Account Settings</Typography>
					</Grid>
					<Grid item xs>
					<Paper className={classes.paperCard}>
						<TextField
							variant="outlined"
							margin="normal"
							defaultValue="currentEmail@domain.com"
							required
							fullWidth
							id="email"
							label="Email"
							name="email"
							autoComplete="email"
						/>
						<TextField
							variant="outlined"
							margin="normal"
							placeholder="empty if unchanged"
							fullWidth
							id="password"
							label="New Password"
							name="password"
							autoComplete="password"
						/>
						<TextField
							variant="outlined"
							margin="normal"
							placeholder="empty if unchanged"
							fullWidth
							id="confirmPassword"
							label="Confirm New Password"
							name="confirmPassword"
							autoComplete="confirmPassword"
						/>
						<FormControlLabel
							control={<Switch checked={state.checkedNotifications} onChange={handleChange} name="checkedNotifications" />}
							label="Allow Notifications" labelPlacement="start"
						/>
					</Paper>
					</Grid>
				<Grid item xs={12}>
					<Typography gutterBottom variant="h4">Confirm Changes</Typography>
				</Grid>
				<Grid item xs={12}>
				<Paper className={classes.paperCard}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="confirmOldPassword"
						label="Confirm Old Password"
						name="confirmOldPassword"
						autoComplete="confirmOldPassword"
					/>
					</Paper>
				</Grid>
				<Grid item xl={12}>
					<Button size="large" color="primary" variant="contained" className={classes.button} onClick={() => { alert('clicked') }}>Save Changes</Button>
				</Grid>
				</Grid>
			</Paper>
		</div>
	);
}

export default Settings;