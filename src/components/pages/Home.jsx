import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from "@material-ui/core"
import NavigationBar from '../modules/NavigationBar';
import PlaylistsContainer from "../modules/PlaylistsContainer";

const useStyles = makeStyles((theme)=>({
	mainContainer: {
		padding: '1rem',
		display: "block",
		justifyContent: "center",
		width: "100%",
		height: "100%",
		backgroundColor: theme.palette.background.paper
	},
	popularTitle: {
		fontSize: '28pt',
	},
	likedTitle: {
		fontSize: '28pt',
		marginTop: '1rem'
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

const api = window.location.protocol+'//'+window.location.hostname+':42069';

function Home({user, setUser, sendNotification, notifications, setNotifications}) {
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
			setLikedPlaylists(data);
		} else {
			setLikedPlaylists([]);
		}
	};

	return (
		<div>
			<NavigationBar setUser={setUser} user={user} setNotifications={setNotifications}
			notifications={notifications} pageName='Home'></NavigationBar>
			
			<Grid container direction="row" justify="center" alignItems="center" fullWidth className={classes.mainContainer}>
				
				<Typography variant="h3" className={classes.popularTitle}>
					Popular Playlists
				</Typography>
				
				<PlaylistsContainer height={800} playlists={popularPlaylists} user={user} fetchPlaylists={fetchPopularPlaylists} sendNotification={sendNotification}/>
				
				<Typography variant="h3" className={classes.likedTitle}>
					Liked Playlists
				</Typography>
				
				<PlaylistsContainer height={800} playlists={likedPlaylists} user={user} fetchPlaylists={fetchLikedPlaylists} sendNotification={sendNotification}/>
				
			</Grid>
		</div>
	);
}

export default Home;