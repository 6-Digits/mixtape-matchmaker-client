import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { AccountCircle, Settings as SettingsIcon, ExitToApp as ExitToAppIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	paper: {
		border: '1px solid #d3d4d5',
	},
}));


function AccountDropDown() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<IconButton
				edge="end"
				aria-label="account of current user"
				aria-haspopup="true"
				color="inherit"
				onClick={handleClick}
			>
				<AccountCircle />
			</IconButton>
			<Menu
				id="customized-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
				elevation={0}
				getContentAnchorEl={null}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
				className={classes.menu}
				classes={{paper: classes.paper}}
			>
				<MenuItem component={Link} to="/settings" className={classes.menuItem}>
					<ListItemIcon>
						<SettingsIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Settings" />
				</MenuItem>
				<MenuItem component={Link} to="/login" className={classes.menuItem}>
					<ListItemIcon>
						<ExitToAppIcon fontSize="small" />
					</ListItemIcon>
					<ListItemText primary="Logout" />
				</MenuItem>
			</Menu>
		</div>
	);
}

export default AccountDropDown;