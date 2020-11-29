import React, { useState, useEffect } from "react";
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Typography } from "@material-ui/core"
import NavigationBar from '../modules/NavigationBar';
import PlaylistsContainer from "../modules/PlaylistsContainer";

const useStyles = makeStyles((theme)=>({
	mainContainer: {
		padding: '5vh 20vh 10vh 20vh',
		display: "block",
		justifyContent: "center",
		width: "100%",
	},
	popularTitle: {
		fontSize: '28pt',
	},
	likedTitle: {
		fontSize: '28pt',
		marginTop: '7vh',
	},
	sectionContainer: {
		paddingTop: '3vh',
		margin: '5vh 0 10vh 0',
		width: '100%',
		padding: '3vh',
		backgroundColor: '#999999',
	},
	playlistsContainer: {
		padding: "20px 20px 20px 20px",
	},
	cardMedia: {
		margin: "auto",
		width: "120px", 
		height: "100px",
	},
	cardContent: {
		textAlign: "justify",
	},
	cardAction: {
		display: 'block',
		textAlign: 'initial',
		margin: '2px',
	}
}));

const api = 'http://localhost:42069/api';

function Home({user, setUser}) {
	const classes = useStyles();
	const [popularPlaylists, setPopularPlaylists] = useState([]);
	const [likedPlaylists, setLikedPlaylists] = useState([]);
	
	const fetchPopularPlaylists = async () => {
		let requestOptions = {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		};
		let response = await fetch(`${api}/mixtape/popular`, requestOptions);
		if(response.status === 200) {
			let data = await response.json();
			data = data.map((dict, index) => {
				let totalLength = 0;
				dict['songList'] = dict['songList'].map((song, i) => {
					if(song['duration']){
						totalLength += song['duration'];
					}
					return song;
				});
				dict['duration'] = totalLength
				return dict;
			});
			setPopularPlaylists(data);
		} else {
			setPopularPlaylists([]);
		}
	};

	const fetchLikedPlaylists = async () => {
		let requestOptions = {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		};
		let response = await fetch(`${api}/mixtape/liked/uid/${user._id}`, requestOptions);
		if(response.status === 200) {
			let data = await response.json();
			data = data.map((dict, index) => {
				let totalLength = 0;
				dict['songList'] = dict['songList'].map((song, i) => {
					if(song['duration']){
						totalLength += song['duration'];
					}
					return song;
				});
				dict['duration'] = totalLength
				return dict;
			});
			setLikedPlaylists(data);
		} else {
			setLikedPlaylists([]);
		}
	};

	return (
		<div>
			<NavigationBar setUser={setUser} user={user} pageName='Home'></NavigationBar>
			
			<Grid container direction="row" justify="center" alignItems="center" fullWidth className={classes.mainContainer}>
				
				<Typography variant="h3" className={classes.popularTitle}>
					Popular Playlists
				</Typography>
				
				<PlaylistsContainer height={800} playlists={popularPlaylists} user={user} fetchPlaylists={fetchPopularPlaylists} />
				
				<Typography variant="h3" className={classes.likedTitle}>
					Liked Playlists
				</Typography>
				
				<PlaylistsContainer height={800} playlists={likedPlaylists} user={user} fetchPlaylists={fetchLikedPlaylists}/>
				
			</Grid>
		</div>
	);
}

export default Home;