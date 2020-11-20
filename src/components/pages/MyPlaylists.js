import React, { useState, useEffect } from "react";
import { Grid, Typography, InputBase, Button, Menu, MenuItem } from '@material-ui/core';
import { Search as SearchIcon, Sort as SortIcon, Add as AddIcon} from '@material-ui/icons';
import { fade, makeStyles } from '@material-ui/core/styles';
import NavigationBar from '../modules/NavigationBar';
import PlaylistsContainer from "../modules/PlaylistsContainer";
import { v4 as uuidv4 } from 'uuid';
import Fuse from 'fuse.js'

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
	},
	page: {
		height: "100%"
	}
}));

const api = 'http://localhost:42069/api';

function MyPlaylists(props) {
	const classes = useStyles();
	const [sortAnchor, setSortAnchor] = useState(null);
	const [myPlaylists, setMyPlaylists] = useState([]);
	const [playlistCache, setPlaylistCache] = useState([]);
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(false);

	const [reverse, setReverse] = useState(false);

	const handleSortClick = (event) => {
		setSortAnchor(event.currentTarget);
	};
	
	const handleSortClose = () => {
		setSortAnchor(null);
	};

	const fetchMyPlaylists = async(userToken, user) => {
		let requestOptions = {
			method: 'GET',
			headers: {'Content-Type': 'application/json', 'x-access-token': userToken}
		};
		let response = await fetch(`${api}/mixtape/uid/${user._id}`, requestOptions);
		if(response.status === 200) {
			let data = await response.json();
			data = data.map((dict, index) => {
				dict['songList'] = dict['songList'].map((song, i) => {
					song['uuid'] = uuidv4() + uuidv4();
					return song;
				});
				return dict;
			});
			setMyPlaylists(data);
			setPlaylistCache(data);
		} else {
			alert(`failed to fetch data with error status ${response.status}`);
		}
	};

	useEffect(() => {
		if(search.length < 2) {
			setPlaylistCache(myPlaylists);
		}
	  }, [myPlaylists]);

	const addPlaylist = async() => {
		let userToken = localStorage.getItem('userToken');
		if(!loading && userToken){
			setLoading(true);
			let requestOptions = {
				method: 'POST',
				headers: {'Content-Type': 'application/json', 'x-access-token': userToken}
			};
			let response = await fetch(`${api}/mixtape/createMixtape/uid/${props.user._id}`, requestOptions);
			if(response.status === 200) {
				let data = await response.json();
				setLoading(false);
				setMyPlaylists([...myPlaylists, data]);
				setPlaylistCache([...myPlaylists, data]);
			} else {
				alert(`failed to fetch data with error status ${response.status}`);
				setLoading(false);
			}
		}
	};

	const removePlaylist = (playlistID) => {
		setMyPlaylists(myPlaylists.filter(function(playlist) { 
			return playlist['_id'] !== playlistID;
		}));
		setPlaylistCache(playlistCache.filter(function(playlist) { 
			return playlist['_id'] !== playlistID;
		}));
	};

	const searchPlaylists = (event) => {
		setSearch(event.target.value);
		if(event.target.value.length > 2){
			// clearTimeout(searchTimeout);
			// // Make a new timeout set to go off in 500ms (.5 second)
			// setSearchTimeout(setTimeout(function () {
				//Search through the list using Fuse.js
				let options = {
					includeScore: false,
					keys: [
					  {
						name: 'name',
						weight: 0.7
					  },
					  {
						name: 'description',
						weight: 0.3
					  }
					]
				  };
				let fuse = new Fuse(playlistCache, options);
				let result = fuse.search(search);
				setMyPlaylists(result);
			// }, 750));
		} else {
			setMyPlaylists(playlistCache);
		}
	}

	const sortPlaylistTitle = () => {
		let playlists = myPlaylists.map(element => {
			return element;
		});
		playlists.sort((a, b) => a.name.localeCompare(b.name));
		setMyPlaylists(playlists);
		handleSortClose();
	};

	const sortPlaylistDuration = () => {
		let playlists = myPlaylists.map(element => {
			let totalLength = 0;
			element.songList.forEach(song=>{
				if(song['duration']){
					totalLength += song['duration'];
				}
			});
			element['duration'] = totalLength;
			return element;
		});
		playlists.sort(function(a, b){return b-a});
		setMyPlaylists(playlists);
		handleSortClose();
	};

	return (
		<div className={classes.page}>
			<NavigationBar setUser={props.setUser} user={props.user} pageName='My Playlists'></NavigationBar>
			
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
									value={search}
									onChange={searchPlaylists}
								/>
						</div>
					</Grid>
					
					<Grid item xs={3} sm={1} className={classes.importGrid}>
						<Button
						variant="contained"
						color="secondary"
						className={classes.button}
						onClick={props.user ? addPlaylist : null}
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
							<MenuItem onClick={sortPlaylistTitle}>By Title</MenuItem>
							<MenuItem onClick={sortPlaylistDuration}>By Duration</MenuItem>
						</Menu>
					</Grid> 
				</Grid>
				
				<PlaylistsContainer height={800} playlists={myPlaylists} setPlaylists={setMyPlaylists} editable={true} fetchPlaylists={fetchMyPlaylists} user={props.user}
				removePlaylist={removePlaylist}/>
			</Grid>
		</div>
	);
}

export default MyPlaylists;