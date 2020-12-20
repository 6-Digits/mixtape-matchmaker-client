import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Settings as SettingsIcon, ExitToApp as ExitToAppIcon } from '@material-ui/icons';
import placeholder from '../../assets/placeholder.png';

const useStyles = makeStyles(() => ({
	paper: {
		border: '1px solid #d3d4d5',
	},
}));

const api = process.env.REACT_APP_API_SERVER;

function AccountDropDown({setUser, user}) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	const [profileImg, setProfileImg] = useState(placeholder);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const logout = () => {
		localStorage.clear();
		setUser(null);
	}
	const fetchUserProfile = async (userToken, user) => {
		let requestOptions = {
			method: 'GET',
			headers: {'Content-Type': 'application/json', 'x-access-token': userToken}
		};
		let response = await fetch(api + `/profile/id/${user._id}`, requestOptions);
		if(response.status === 200) {
			let data = await response.json();
			setProfileImg(data['imgSrc']);
		} else {

		}
	};
	useEffect(() => {
		// let userToken = JSON.parse(cookies.get('userToken'));
		// let userToken = cookies['userToken'];
		let userToken = localStorage.getItem('userToken');
		if(userToken && user){
			fetchUserProfile(userToken, user);
		} 
	  }, []);

	return (
		<div>
			<IconButton
				edge="end"
				aria-label="account of current user"
				aria-haspopup="true"
				color="inherit"
				onClick={handleClick}
			>
				<Avatar alt='avatar' src={profileImg} className={classes.avatar} />
			</IconButton>
			<Menu
				id="customized-menu"
				anchorEl={anchorEl}
				keepMounted
				open={open}
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
				<MenuItem component={Link} onClick={logout} className={classes.menuItem}>
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