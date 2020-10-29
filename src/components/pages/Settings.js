import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import Sidebar from '../navbar/Sidebar';
import TextField from '@material-ui/core/TextField';
import logo from "../../assets/logo.png";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

const options = [
	'Female',
	'Male',
	'Other',
	'Apache Helicopter',
];


export default function Settings(props) {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [selectedIndex, setSelectedIndex] = React.useState(1);
	const [state, setState] = React.useState({
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
		paper: {
			padding: theme.spacing(2),
			margin: 'auto',
			maxWidth: '100%',
		},
		image: {
			width: 256,
			height: 256,
		},
		img: {
			margin: 'auto',
			display: 'block',
			maxWidth: '100%',
			maxHeight: '100%',
		},
	}));

	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Sidebar pageName='My Matches'></Sidebar>
			<Paper className={classes.paper}>
				<Grid container spacing={3} className={classes.mainContainer}>
					<Grid item xs={12}>
						<Typography gutterBottom variant="h4">Public Profile</Typography>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Paper className={classes.paper}>
							<ButtonBase className={classes.image}>
								<img src={logo} className={classes.image} alt="logo" />
							</ButtonBase>
						</Paper>
					</Grid>
					<Grid item xs={12} sm={9}>
						<Paper className={classes.paper}>
							<TextField
								variant="outlined"
								margin="normal"
								defaultValue="Username_"
								required
								fullWidth
								id="username"
								label="User Name"
								name="username"
								autoComplete="nickname"
								autoFocus
							/>
							<TextField
								variant="outlined"
								margin="normal"
								defaultValue="Actual Name"
								required
								fullWidth
								id="name"
								label="Name"
								name="Name"
								autoComplete="name"
								autoFocus
							/>
							<Typography gutterBottom variant="subtitle1">
								<form className={classes.container} noValidate>
									<TextField
										id="date"
										label="Birthday"
										type="date"
										defaultValue={Date.now()}
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
					<Paper className={classes.paper}>
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
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							defaultValue="**********_ (empty if unchanged)"
							required
							fullWidth
							id="password"
							label="Password"
							name="password"
							autoComplete="password"
							autoFocus
						/>
						<TextField
							variant="outlined"
							margin="normal"
							defaultValue="**********_ (empty if unchanged)"
							required
							fullWidth
							id="confirmPassword"
							label="Confirm Password"
							name="confirmPassword"
							autoComplete="confirmPassword"
							autoFocus
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
				<Paper className={classes.paper}>
					<TextField
						variant="outlined"
						margin="normal"
						defaultValue="Enter Old Password_"
						required
						fullWidth
						id="confirmOldPassword"
						label="Confirm Old Password"
						name="confirmOldPassword"
						autoComplete="confirmOldPassword"
						autoFocus
					/>
					</Paper>
				</Grid>
				<Grid item xl={12}>
					<Button size="large" color="primary" onClick={() => { alert('clicked') }}>Save Changes</Button>
				</Grid>
				</Grid>
			</Paper>
		</div>
	);
}