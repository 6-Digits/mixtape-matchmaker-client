import React, { useState, useEffect } from "react";
import { Grid, Typography, Button, Menu, MenuItem } from '@material-ui/core';
import { fade, makeStyles } from '@material-ui/core/styles';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Sort as SortIcon, Undo as UndoIcon, Redo as RedoIcon } from '@material-ui/icons';
import PlaylistSongCard from './PlaylistSongCard';
import PlaylistSearchBar from './PlaylistSearchBar';
import Fuse from 'fuse.js'
import { v4 as uuidv4 } from 'uuid';
import ShareDropDown from "./ShareDropDown";

const useStyles = makeStyles((theme) => ({
	form: {
		width: '100%'
	},
	button: {
		fontWeight: "bold",
		fontFamily: "Arial Black",
		height: "100%"
	},
	input: {
		height: "80vh" ,
	},
	playlist: {
		display: "block",
		justifyContent: "center",
		width: "100%"
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		width: '100%',
		margin: '2vh 0 2vh 0'
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
	},
	card: {
		marginTop: "1rem",
		width: "97.5%",
		margin: "auto"
	},
	dragBox: {
		padding: theme.spacing(1, 0, 1, 0),
		borderRadius: "0.25rem",
		backgroundColor: theme.palette.background.default,
		overflowY: "auto",
		height: "30vh"
	},
	dragContainer: {
		textAlign: "center",
	},
	list: {
		listStyleType: "none",
		paddingInlineStart: 0,
		justifyContent: "center"
	},
	importGrid: {
		maxWidth: "100%"
	},
	controlSongs: {
		marginBottom: "0.5rem"
	},
}));

const api = window.location.protocol+'//'+window.location.hostname+':42069/api'; //(location.port ? ':'+location.port: '');
// Change Stack Syntax
/*
	{
		type : 'add' | 'swap' | 'remove'
		start: currentIndex - default
		end  : currentIndex - default
		song : {} - Song to add
	}
*/

function Playlist({title, editable, draggable, songs, setSongs, currentIndex, handleCurrentIndex, setChanged, setAutoPlay, playlistID, notSharable}) {
	const classes = useStyles();
	const shareLink = `${window.location.origin}/share/${playlistID}`;
	
	const [sortAnchor, setSortAnchor] = useState(null);
	const [search, setSearch] = useState("");
	const [viewingSongs, setViewingSongs] = useState(songs);
	const [undo, setUndo] = useState([]);
	const [redo, setRedo] = useState([]);

	const handleSortClick = (event) => {
		setSortAnchor(event.currentTarget);
	};
	const handleSortClose = () => {
		setSortAnchor(null);
	};

	useEffect(() => {
		setViewingSongs(songs)
	}, [songs]);


	const handleOnDragEnd = (result) => {
		if (!result.destination) return;
		if (result.destination.index === result.source.index) return;

		let items = Array.from(viewingSongs);
		let [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setChanged(true);
		setViewingSongs(items);
		setSongs(items);
		createSwap(result.source.index, result.destination.index);
	}
	
	const filterSongs = (event) => {
		setSearch(event.target.value);
		if(event.target.value.length > 2){
			let options = {
				includeScore: false,
				keys: [
					{
						name: 'title',
						weight: 0.7
					},
					{
						name: 'author',
						weight: 0.3
					}
				]
			};
			let fuse = new Fuse(songs, options);
			let result = fuse.search(search);
			setViewingSongs(result);
		} else {
			setViewingSongs(songs);
		}
	}

	const createSwap = (start, end, stack = 'undo') => {
		let swap = {
			type : 'swap',
			start: start,
			end  : end,
			song : {}
		};
		if(stack === 'undo') {
			let undoCopy = undo.slice(undo.length > 10 ? 1 : 0);
			undoCopy.push(swap);
			setUndo(undoCopy);
		} else {
			let redoCopy = redo.slice(redo.length > 10 ? 1 : 0);
			redoCopy.push(swap);
			setRedo(redoCopy);
		}
	};
	
	const createAdd = (song, index, stack = 'undo') => {
		let add = {
			type : 'add',
			start: index,
			end  : index,
			song : song
		};
		if(stack === 'undo') {
			let undoCopy = undo.slice(undo.length > 10 ? 1 : 0);
			undoCopy.push(add);
			setUndo(undoCopy);
		} else {
			let redoCopy = redo.slice(redo.length > 10 ? 1 : 0);
			redoCopy.push(add);
			setRedo(redoCopy);
		}
	};

	const createRemove = (song, index, stack = 'undo') => {
		let remove = {
			type : 'remove',
			start: index,
			end  : index,
			song : song
		};
		if(stack === 'undo') {
			let undoCopy = undo.slice(undo.length > 10 ? 1 : 0);
			undoCopy.push(remove);
			setUndo(undoCopy);
		} else {
			let redoCopy = redo.slice(redo.length > 10 ? 1 : 0);
			redoCopy.push(remove);
			setRedo(redoCopy);
		}
	};

	const undoAction = () => {
		let action = undo.slice(-1)[0];
		if(action){
			setUndo(undo.slice(0, -1)); //Pop
			let items = Array.from(viewingSongs);
			let type = action.type;
			if(type === 'swap') {
				let [reorderedItem] = items.splice(action.end, 1);
				items.splice(action.start, 0, reorderedItem);
				setChanged(true);
				setViewingSongs(items);
				setSongs(items);
				createSwap(action.start, action.end, 'redo');
			} else if(type === 'add') {
				items.splice(action.start, 0, action.song);
				setChanged(true);
				setViewingSongs(items);
				setSongs(items);
				createRemove(action.song, action.start, 'redo');
			} else if(type === 'remove') {
				items.splice(action.start, 1);
				setChanged(true);
				setViewingSongs(items);
				setSongs(items);
				createAdd(action.song, action.start, 'redo');
			}
		}
	};	
	const redoAction = () => {
		let action = redo.slice(-1)[0];
		if(action){
			setRedo(redo.slice(0, -1)); //Pop
			let type = action.type;
			let items = Array.from(viewingSongs);
			if(type === 'swap') {
				let [reorderedItem] = items.splice(action.start, 1);
				items.splice(action.end, 0, reorderedItem);
				setChanged(true);
				setViewingSongs(items);
				setSongs(items);
				createSwap(action.start, action.end);
			} else if(type === 'add') {
				items.splice(action.start, 0, action.song);
				setChanged(true);
				setViewingSongs(items);
				setSongs(items);
				createRemove(action.song, action.start);
			} else if(type === 'remove') {
				items.splice(action.start, 1);
				setChanged(true);
				setViewingSongs(items);
				setSongs(items);
				createAdd(action.song, action.start);
			}
		}
	};

	const addSong = async(song) => {
		if(songs.length > 30) {
			alert("You cannot add more than 30 songs!");
		} else {
			let userToken = localStorage.getItem('userToken');
			let requestOptions = {
				method: 'POST',
				headers: {'Content-Type': 'application/json', 'x-access-token': userToken}
			}
			let response = await fetch(`${api}/mixtape/createSong/${song.videoId}`, requestOptions);
			if(response.status === 200) {
				let data = await response.json();
				data['uuid'] = uuidv4() + uuidv4();
				let newSongList = [...songs, data];
				createRemove(data, songs.length);
				setViewingSongs(newSongList);
				setSongs(newSongList);	
				setChanged(true);
			}
		}
	};

	const deleteSong = (uuid) => {
		let songIndex = -1;
		let deletedSong = null;
		let newSongList = songs.filter(function(song, index) { 
			if(song['uuid'] === uuid){
				songIndex = index;
				deletedSong = song;
			} 
			return song['uuid'] !== uuid;
		});
		if(songIndex === -1 || !deletedSong) {
			return;
		}
		createAdd(deletedSong, songIndex);
		setViewingSongs(newSongList);
		setSongs(newSongList);
		setChanged(true);
	};
	
	return (
		<div className={classes.playlist}>
			{title ? 
				<Typography variant="h3" className={classes.title}>
					{title}
				</Typography> : null}
			<Grid
			container
			direction="row"
			justify="space-between"
			alignItems="center"
			className={classes.controlSongs}
			>
				<Grid item xs={6}>
					{editable ? 
					<PlaylistSearchBar search={search} setSearch={setSearch} filterSongs={filterSongs} addSong={addSong}/>
					: null
					}
				</Grid>
				
				{editable ?
				<Grid item xs={3} sm={1}>
						<Button
						variant="contained"
						color="default"
						className={classes.button}
						disabled = {undo.length < 1}
						onClick = {undoAction}
						aria-controls="add-playlist" aria-haspopup="true">
							<UndoIcon fontSize='large'></UndoIcon>
						</Button>
				</Grid>
				: null }
				
				{editable ?
				<Grid item xs={3} sm={1}>
						<Button
						variant="contained"
						color="default"
						className={classes.button}
						aria-controls="add-playlist" aria-haspopup="true"
						disabled = {redo.length < 1}
						onClick={redoAction}
						>
							<RedoIcon fontSize='large'></RedoIcon> 
						</Button>
				</Grid>
				: null }
				
				{	true ? 
					null :
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
							<MenuItem onClick={handleSortClose}>By Title</MenuItem>
							<MenuItem onClick={handleSortClose}>By Duration</MenuItem>
							<MenuItem onClick={handleSortClose}>By Author</MenuItem>
						</Menu>
					</Grid> 
				}
				{ notSharable ? null : <ShareDropDown contentLink={shareLink}></ShareDropDown> }
			</Grid>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<div className={classes.dragBox}>
					<Droppable droppableId="playlist" className={classes.dragContainer}>
						{(provided) => (
							<ul className={classes.list} {...provided.droppableProps} ref={provided.innerRef}>
								{viewingSongs.map(({title, author, genre, duration, imgUrl, url, uuid}, index) => {
									return (
										<Draggable key={uuid} draggableId={uuid} index={index} isDragDisabled={!draggable}>
											{(provided) => (
												<div className={classes.card} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
													<PlaylistSongCard 
													index={index}
													song={title} 
													editable={editable}
													author={author}
													genre={genre}
													duration={duration}
													img={imgUrl}
													src={url}
													currentIndex={currentIndex}
													handleCurrentIndex={handleCurrentIndex}
													uuid={uuid}
													deleteSong={deleteSong}
													setAutoPlay={setAutoPlay}
													/>
												</div>
											)}
										</Draggable>
									);
								})}
								{provided.placeholder}
							</ul>
						)}
					</Droppable>
				</div>
			</DragDropContext>
		</div>
	);
}

export default Playlist;