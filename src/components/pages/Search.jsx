import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Typography, Button, Menu, MenuItem } from '@material-ui/core';
import { Sort as SortIcon } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import NavigationBar from '../modules/NavigationBar';
import PlaylistsContainer from "../modules/PlaylistsContainer";

const useStyles = makeStyles((theme) => ({
	container: {
		padding: '1rem',
		display: "block",
		justifyContent: "center",
		width: "100%",
		backgroundColor: theme.palette.background.paper
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
	title: {
		fontSize: '28pt',
	},
	query: {
		fontSize: '16pt',
	},
	importGrid: {
		maxWidth: "100%"
	},
	page: {
		height: "100%"
	}
}));

const api = process.env.REACT_APP_API_SERVER;

function Search(props) {
	const classes = useStyles();
	const location = useLocation();
	const [sortAnchor, setSortAnchor] = useState(null);
	const [playlists, setPlaylists] = useState([]);
	const [width, setWidth] = useState(0);

	useEffect(() => {
		function updateWidth() {
			setWidth(window.innerWidth);
		}
		window.addEventListener('resize', updateWidth);
		updateWidth();
		return () => window.removeEventListener('resize', updateWidth);
	}, []);
	
	const handleSortClick = (event) => {
		setSortAnchor(event.currentTarget);
	};
	
	const handleSortClose = () => {
		setSortAnchor(null);
	};
	
	useEffect(() => {
		fetchPlaylists();
	}, [location.query]);

	const fetchPlaylists = async () => {
		if(location.query){
			let requestOptions = {
				method: 'GET',
				headers: {'Content-Type': 'application/json'}
			};
			let response = await fetch(`${api}/mixtape/search/${location.query}`, requestOptions);
			if(response.status === 200) {
				let data = await response.json();
				data = data.map((dict) => {
					let totalLength = 0;
					dict['songList'] = dict['songList'].map((song) => {
						if(song['duration']){
							totalLength += song['duration'];
						}
						return song;
					});
					dict['duration'] = totalLength
					return dict;
				});
				setPlaylists(data);
			} else {
				setPlaylists([]);
			}
		} else {
			setPlaylists([]);
		}	
	};


	const sortPlaylistTitle = (ascending) => {
		let playlistsTemp = playlists.map(element => {
			return element;
		});
		playlistsTemp.sort((a, b) => ascending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
		setPlaylists(playlistsTemp);
		handleSortClose();
	};

	const sortPlaylistDuration = (ascending) => {
		let playlistsTemp = Array.from(playlists);
		playlistsTemp.sort((a, b) => ascending ? parseFloat(a.duration) - parseFloat(b.duration) : 
											 parseFloat(b.duration) - parseFloat(a.duration) );
		setPlaylists(playlistsTemp);
		handleSortClose();
	};

	return (
		<div className={classes.page}>
			<NavigationBar setUser={props.setUser} user={props.user} setNotifications={props.setNotifications}
			notifications={props.notifications} pageName='Search' screenWidth={width}></NavigationBar>
			
			<Grid container direction="row" justify="center" alignItems="center" fullWidth className={classes.container}>					
				<Grid container direction="row" justify="space-between" alignItems="center">
					<Grid item xs={12} sm={6}>
						<Typography variant="h3" className={classes.title}>
							Search results for: 
						</Typography>
					</Grid>
					
					<Grid item xs={12} sm={1} className={classes.importGrid}>
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
							<MenuItem onClick={() => sortPlaylistTitle(true)}>By Title (Ascending)</MenuItem>
							<MenuItem onClick={() => sortPlaylistTitle(false)}>By Title (Descending)</MenuItem>
							<MenuItem onClick={() => sortPlaylistDuration(true)}>By Duration (Ascending)</MenuItem>
							<MenuItem onClick={() => sortPlaylistDuration(false)}>By Duration (Descending)</MenuItem>
						</Menu>
					</Grid> 
					
					<Grid item xs={12} sm={6}>
						<Typography className={classes.query}> 
							{location.query ? location.query : "No results found"}
						</Typography>
					</Grid>
				</Grid>
				
				<PlaylistsContainer height={800} playlists={playlists} fetchPlaylists={fetchPlaylists} user={props.user} notHome={true}/>
					
			</Grid>
		</div>
	);
}

export default Search;