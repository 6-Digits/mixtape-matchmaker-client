import React, { useState, useEffect } from "react";
import {Box, Container, Grid, Typography, InputBase, IconButton, Card, Button, Menu, MenuItem} from '@material-ui/core';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import ReactPlayer from 'react-player/youtube';
import Sidebar from '../navbar/Sidebar';
import PlaylistCard from './PlaylistCard';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Group } from "@material-ui/icons";
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import SortIcon from '@material-ui/icons/Sort';

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
	}
}));

const playlist = [
	{
		id: 'utp',
		name: 'Uptown Funk',
		author: 'Mark Ronson',
		genre: 'Pop',
		duration: 154
	},
	{
		id: 'pra',
		name: 'Party Rock Anthem',
		author: 'David Listenbee',
		genre: 'Pop',
		duration: 503
	},
	{
		id: 'igf',
		name: 'I Gotta Feeling',
		author: 'Black Eyed Peas',
		genre: 'Pop',
		duration: 123
	},
	{
		id: 'dsd',
		name: 'Party Rock Anthem 2',
		author: 'Hello there',
		genre: 'Pop 2.0',
		duration: 412
	},
	{
		id: 'fsf',
		name: 'I Gotta Feeling 2',
		author: 'General Kenobi',
		genre: 'Pop 3.0',
		duration: 323
	}
]

function Playlist({title, importable, editable, draggable}) {
	const [playlistItems, updatePlaylistItems] = useState(playlist);
	const [sortAnchor, setSortAnchor] = React.useState(null);
	
	const handleSortClick = (event) => {
		setSortAnchor(event.currentTarget);
	  };
	
	const handleSortClose = () => {
		setSortAnchor(null);
	};

	function handleOnDragEnd(result) {
		if (!result.destination) return;

		const items = Array.from(playlistItems);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		updatePlaylistItems(items);
	}

	const classes = useStyles();
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
			>
				<Grid item xs={12} sm={6}>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
								<SearchIcon />
						</div>
							<InputBase
								placeholder={editable ? "Songs to add..." : "Search playlist song..."}
								classes={{
										root: classes.inputRoot,
										input: classes.inputInput,
								}}
								inputProps={{ 'aria-label': 'search' }}
							/>
					</div>
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
						<MenuItem onClick={handleSortClose}>By Title</MenuItem>
						<MenuItem onClick={handleSortClose}>By Duration</MenuItem>
						<MenuItem onClick={handleSortClose}>By Author</MenuItem>
					</Menu>
				</Grid>
				{
					importable ? 
						<Grid item xs={12} sm={1} className={classes.importGrid}>
							<Button
							variant="contained"
							color="primary"
							className={classes.button}>
								<LibraryAddIcon fontSize='large'></LibraryAddIcon>
								{" Import"}
							</Button>
						</Grid> : null
				}
			</Grid>
			<DragDropContext onDragEnd={handleOnDragEnd}>
				<div className={classes.dragBox}>
					<Droppable droppableId="playlist" className={classes.dragContainer}>
						{(provided) => (
							<ul className={classes.list} {...provided.droppableProps} ref={provided.innerRef}>
								{playlistItems.map(({id, name, author, genre, duration}, index) => {
									return (
										<Draggable key={id} draggableId={id} index={index} isDragDisabled={!draggable}>
											{(provided) => (
												<div className={classes.card} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
													<PlaylistCard 
													song={name} 
													editable={true}
													author={author}
													genre={genre}
													duration={duration}
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