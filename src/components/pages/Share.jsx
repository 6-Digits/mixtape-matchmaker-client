import React, { useState } from "react";
import { Grid, Typography } from '@material-ui/core';
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
		height: "100vh"
	}
}));


const api = process.env.REACT_APP_API_SERVER;

function Share(props) {
    const classes = useStyles();
    const [query, setQuery] = useState(null);
    const id = props.match.params.id;
	const [playlists, setPlaylists] = useState([]);
    
    
	// useEffect(() => {
	// 	alert(id);
	// }, []);

    const getPlaylistFromID = async() => {
        if(id) {
            let requestOptions = {
				method: 'GET',
				headers: {'Content-Type': 'application/json'}
			};
			let response = await fetch(`${api}/mixtape/viewMixtape/id/${id}`, requestOptions);
			if(response.status === 200) {
				let data = await response.json();
				let totalLength = 0;
				data['songList'] = data['songList'].map((song) => {
					if(song['duration']){
						totalLength += song['duration'];
					}
					return song;
				});
				data['duration'] = totalLength
				setPlaylists([data]);
                setQuery(data['name']);
			} else {
				setPlaylists([]);
                setQuery(null);
			}
        } else {
            setPlaylists([]);
            setQuery(null);
        }
    }

	return (
		<div className={classes.page}>
            <NavigationBar setUser={props.setUser} user={props.user} setNotifications={props.setNotifications}
			notifications={props.notifications} pageName='Search'></NavigationBar>
			<Grid container direction="row" justify="center" alignItems="center" fullWidth className={classes.container}>					
				<Grid container direction="column" justify="space-between" alignItems="flex-start">
					<Grid item xs={12}>
						<Typography variant="h3" className={classes.title}>
							Search results for: 
						</Typography>
					</Grid>
					<Grid item xs={12}>
						<Typography className={classes.query}> 
							{query ? query : "No results found"}
						</Typography>
					</Grid>
				</Grid>
				
				<PlaylistsContainer height={800} playlists={playlists} fetchPlaylists={getPlaylistFromID} user={props.user} notHome={true} sendNotification={props.sendNotification}/>
					
			</Grid>
		</div>
	);
}

export default Share;