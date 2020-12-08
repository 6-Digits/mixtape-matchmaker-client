import React, { useEffect, useState } from 'react';
import { IconButton, Badge, Menu, MenuItem, withStyles } from '@material-ui/core';
import { Notifications as NotificationsIcon } from '@material-ui/icons';
import Notification from '../modules/Notification';
import NotificationSocket from '../frameworks/NotificationSocket';

const api = 'http://localhost:42069/api';

const ITEM_HEIGHT = 48;

function Notifications({user}) {
	const notificationList = []
;	const [anchorEl, setAnchorEl] = useState(null);
	const [oldNotifications, setOldNotifications] = useState(notificationList ? notificationList : []);
	const { notifications, sendNotification } = NotificationSocket(user ? user._id : "", user);
	const open = Boolean(anchorEl);
	
	const fetchNotifications = async () => {
		let requestOptions = {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		};
		let response = await fetch(`${api}/profile/notifications/uid/${user._id}`, requestOptions);
		if(response.status === 200) {
			let data = await response.json();
			setOldNotifications(data);
		}else {
			setOldNotifications([]);
		}
	};

	useEffect(() => {
		fetchNotifications();
	}, []);
	

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		sendNotification("HI")
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const StyledMenu = withStyles({
		paper: {
			border: '1px solid #d3d4d5',
		},
	})((props) => (
		<Menu
			id="long-menu"
			anchorEl={anchorEl}
			keepMounted
			open={open}
			onClose={handleClose}
			PaperProps={{
				style: {
					maxHeight: ITEM_HEIGHT * 4.5,
					width: '25%',
				},
			}}
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
			{...props}
		/>
	));

	return (
		<div>
			<IconButton
				aria-label="more"
				aria-controls="long-menu"
				aria-haspopup="true"
				onClick={handleClick}
			>
				<Badge badgeContent={oldNotifications.length} color="secondary">
					<NotificationsIcon fontSize='large' />
				</Badge>
			</IconButton>
			<StyledMenu>
				{oldNotifications.map((option, i) => (
					<MenuItem key={i}>
						<Notification link={option.link} message={option.message}></Notification>
					</MenuItem>
				))}
			</StyledMenu>
		</div>
	);
}

export default Notifications;