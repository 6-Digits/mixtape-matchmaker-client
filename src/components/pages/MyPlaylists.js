import React, { useState, useEffect } from "react";
import { Grid, Typography, InputBase, Button, Menu, MenuItem } from '@material-ui/core';
import { Search as SearchIcon, Sort as SortIcon, Add as AddIcon} from '@material-ui/icons';
import { fade, makeStyles } from '@material-ui/core/styles';
import NavigationBar from '../modules/NavigationBar';
import PlaylistContainer from "../modules/PlaylistContainer";

const useStyles = makeStyles((theme) => ({
	container: {
		padding: '5vh 20vh 10vh 20vh',
		display: "block",
		justifyContent: "center",
		width: "100%",
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		width: '100%',
		marginTop: '3vh',
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
		padding: theme.spacing(2, 2, 2, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '50ch',
		},
	},
	button: {
		fontWeight: "bold",
		fontFamily: "Arial Black",
		height: "100%"
	},
	sectionContainer: {
		paddingTop: '3vh',
		margin: '5vh 0 10vh 0',
		width: '100%',
		padding: '3vh',
		backgroundColor: '#999999',
	},
	importGrid: {
		maxWidth: "100%"
	}
}));

const myPlaylists = Array(20).fill('My Playlist').map((x, i) => ({
	title: x + ' ' + i,
	thumbnail: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f82dc1a7-8b0b-495d-bab6-b97798f49ce4/dbwh40a-2466e07d-5072-4a4a-b248-1dad0272e0cf.png/v1/fill/w_1024,h_1132,strp/nero_claudius_navidad___padoru_padoru_by_alexzer09_dbwh40a-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD0xMTMyIiwicGF0aCI6IlwvZlwvZjgyZGMxYTctOGIwYi00OTVkLWJhYjYtYjk3Nzk4ZjQ5Y2U0XC9kYndoNDBhLTI0NjZlMDdkLTUwNzItNGE0YS1iMjQ4LTFkYWQwMjcyZTBjZi5wbmciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.OStV9rvQUYZQLJnxdKHWBNaHADQRzWDkEnO2kEyCyvo",
	editable: true
}));

function MyPlaylists(props) {
	const classes = useStyles();
	const [sortAnchor, setSortAnchor] = useState(null);
	
	const handleSortClick = (event) => {
		setSortAnchor(event.currentTarget);
	};
	
	const handleSortClose = () => {
		setSortAnchor(null);
	};
	
	return (
		<div>
			<NavigationBar setUser={props.setUser} pageName='My Playlists'></NavigationBar>
			
			<Grid container direction="row" justify="center" alignItems="center" fullWidth className={classes.container}>
				<Typography variant="h2">
					My Playlists
				</Typography>
				
				<Grid container direction="row" justify="space-between" alignItems="center">
					<Grid item xs={12} sm={6}>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
								<InputBase
									placeholder="Search for playlist..."
									classes={{
											root: classes.inputRoot,
											input: classes.inputInput,
									}}
									inputProps={{ 'aria-label': 'search' }}
								/>
						</div>
					</Grid>
					
					<Grid item xs={3} sm={1} className={classes.importGrid}>
						<Button
						variant="contained"
						color="secondary"
						className={classes.button}
						aria-controls="add-playlist" aria-haspopup="true">
							<AddIcon fontSize='large'></AddIcon>
							{" Add"}
						</Button>
					</Grid> 
					
					<Grid item xs={3} sm={1} className={classes.importGrid}>
						<Button
						variant="contained"
						color="secondary"
						className={classes.button}
						aria-controls="sort-menu" aria-haspopup="true" onClick={handleSortClick}>
							<SortIcon fontSize='large'></SortIcon>
							{" Sort"}
						</Button>
						<Menu
							id="sort-menu"
							anchorEl={sortAnchor}
							keepMounted
							open={Boolean(sortAnchor)}
							onClose={handleSortClose}
						>
							<MenuItem onClick={handleSortClose}>By Title</MenuItem>
							<MenuItem onClick={handleSortClose}>By Duration</MenuItem>
							<MenuItem onClick={handleSortClose}>By Author</MenuItem>
						</Menu>
					</Grid> 
				</Grid>
				
				<PlaylistContainer height={700} playlists={myPlaylists} />
			</Grid>
		</div>
	);
}

export default MyPlaylists;