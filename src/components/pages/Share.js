import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Grid, Typography, Button, Menu, MenuItem } from '@material-ui/core';
import { Search as SearchIcon, Sort as SortIcon } from '@material-ui/icons';
import { fade, makeStyles } from '@material-ui/core/styles';
import NavigationBar from '../modules/NavigationBar';
import PlaylistsContainer from "../modules/PlaylistsContainer";

const useStyles = makeStyles((theme) => ({
	container: {
		padding: '5vh 20vh 10vh 20vh',
		display: "block",
		justifyContent: "center",
		width: "100%",
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


const api = 'http://localhost:42069/api';

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
            <NavigationBar setUser={props.setUser} user={props.user} pageName='Search'></NavigationBar>
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
				
				<PlaylistsContainer height={800} playlists={playlists} fetchPlaylists={getPlaylistFromID} user={props.user}/>
					
			</Grid>
		</div>
	);
}

export default Share;