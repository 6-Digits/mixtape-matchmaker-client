import React, { useState, useEffect } from "react";
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, InputBase, Badge, Drawer, List, Divider, ListItem, ListItemText } from '@material-ui/core';
import { Menu as MenuIcon, Search as SearchIcon, AccountCircle, Notifications as NotificationsIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@material-ui/icons';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
		display: 'block',
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
		width: '20ch',
		},
	},
	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
		display: 'flex',
		},
	},
	root: {
		display: 'flex',
	},
	appBar: {
		transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(['margin', 'width'], {
		easing: theme.transitions.easing.easeOut,
		duration: theme.transitions.duration.enteringScreen,
		}),
	},
	hide: {
		display: 'none',
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerHeader: {
		display: 'flex',
		alignItems: 'center',
		padding: theme.spacing(0, 1),
		// necessary for content to be below app bar
		...theme.mixins.toolbar,
		justifyContent: 'flex-end',
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: -drawerWidth,
	},
	contentShift: {
		transition: theme.transitions.create('margin', {
		easing: theme.transitions.easing.easeOut,
		duration: theme.transitions.duration.enteringScreen,
		}),
		marginLeft: 0,
	},
}));


function Sidebar(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const menuId = 'primary-search-account-menu';

	return (
		<div className={classes.grow}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
					>
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} variant="h6" noWrap>
						{props.pageName}
					</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
								root: classes.inputRoot,
								input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<IconButton aria-label="show 17 new notifications" color="inherit">
							<Badge badgeContent={17} color="secondary">
								<NotificationsIcon />
							</Badge>
						</IconButton>
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-controls={menuId}
							aria-haspopup="true"
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
				paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
				</IconButton>
				</div>
				<Divider />
				<List>
				{['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
					<ListItem button key={text}>
					<ListItemText primary={text} />
					</ListItem>
				))}
				</List>
				<Divider />
				<List>
				{['All mail', 'Trash', 'Spam'].map((text, index) => (
					<ListItem button key={text}>
					<ListItemText primary={text} />
					</ListItem>
				))}
				</List>
			</Drawer>
		</div>
	);
}

export default Sidebar;