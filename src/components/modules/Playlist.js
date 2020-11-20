import React, { useState, useEffect } from "react";
import { Grid, Typography, InputBase, Button, Menu, MenuItem } from '@material-ui/core';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { LibraryAdd as LibraryAddIcon, Sort as SortIcon, Search as SearchIcon, Undo as UndoIcon, Redo as RedoIcon, Share as ShareIcon } from '@material-ui/icons';
import PlaylistCard from './PlaylistCard';
import SearchBar from './SearchBar';
import Fuse from 'fuse.js'
import { v4 as uuidv4 } from 'uuid';

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
		width: "90%",
		margin: "auto"
	},
	dragBox: {
		padding: theme.spacing(1, 0, 1, 0),
		borderRadius: "0.25rem",
		backgroundColor: theme.palette.text.secondary,
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
	}
}));

function Playlist({title, importable, editable, draggable, shareable, songs, setSongs, currentIndex, handleCurrentIndex, setChanged}) {
	const [sortAnchor, setSortAnchor] = useState(null);
	const [search, setSearch] = useState("");
	const [viewingSongs, setViewingSongs] = useState(songs);

	const handleSortClick = (event) => {
		setSortAnchor(event.currentTarget);
	};
	const handleSortClose = () => {
		setSortAnchor(null);
	};

	function handleOnDragEnd(result) {
		if (!result.destination) return;

		const items = Array.from(viewingSongs);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setViewingSongs(items);
		setSongs(items);
		setChanged(true);
	}

	const classes = useStyles();
	const shareContent = () => {
		alert(`draggable is ${draggable}`);
	};

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

	const addSong = (song) => {
		song['uuid'] = uuidv4() + uuidv4();
		let newSongList = [...songs, song];
		setViewingSongs(newSongList);
		setSongs(newSongList);
	};

	const deleteSong = (uuid) => {
		let newSongList = songs.filter(function(song) { 
			return song['uuid'] !== uuid;
		});
		setViewingSongs(newSongList);
		setSongs(newSongList);
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
					<SearchBar search={search} setSearch={setSearch} editable={editable} filterSongs={filterSongs} addSong={addSong}/>
					: null
					}
				</Grid>
				
				{editable ?
				<Grid item xs={3} sm={1}>
						<Button
						variant="contained"
						color="default"
						className={classes.button}
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
						aria-controls="add-playlist" aria-haspopup="true">
							<RedoIcon fontSize='large'></RedoIcon> 
						</Button>
				</Grid>
				: null }
				
				{shareable ?
				<Grid item xs={3} sm={1}>
						<Button
						variant="contained"
						color="primary"
						className={classes.button}
						onClick={shareContent}
						aria-controls="add-playlist" aria-haspopup="true">
							<ShareIcon fontSize='large'></ShareIcon>
						</Button>
				</Grid>
				: null }
				
				{	editable ? 
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
				{
					// importable ? 
					// 	<Grid item xs={12} sm={1} className={classes.importGrid}>
					// 		<Button
					// 		variant="contained"
					// 		color="primary"
					// 		className={classes.button}>
					// 			<LibraryAddIcon fontSize='large'></LibraryAddIcon>
					// 			{" Import"}
					// 		</Button>
					// 	</Grid> : null
				}
			</Grid>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<div className={classes.dragBox}>
					<Droppable droppableId="playlist" className={classes.dragContainer}>
						{(provided) => (
							<ul className={classes.list} {...provided.droppableProps} ref={provided.innerRef}>
								{viewingSongs.map(({id, title, author, genre, duration, imgUrl, url, uuid}, index) => {
									return (
										<Draggable key={uuid} draggableId={uuid} index={index} isDragDisabled={!draggable}>
											{(provided) => (
												<div className={classes.card} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
													<PlaylistCard 
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