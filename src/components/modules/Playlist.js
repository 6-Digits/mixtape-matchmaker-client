import React, { useState, useEffect } from "react";
import {Box, Container, Grid, Typography, InputBase, IconButton, Card} from '@material-ui/core';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import ReactPlayer from 'react-player/youtube';
import Sidebar from '../navbar/Sidebar';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const useStyles = makeStyles((theme) => ({
	form: {
	  width: '100%'
	},
	submit: {
	  margin: theme.spacing(3, 0, 2),
	  fontWeight: "bold",
	  fontFamily: "Arial Black"
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
		width: '100%'
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
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    marginTop: "1rem",
    textAlign: "center",
    fontWeight: "bold",
    width: "90%",
    margin: "auto"
  },
  dragBox: {
    marginTop: "1rem",
		padding: theme.spacing(1, 0, 1, 0),
    borderRadius: "0.25rem",
    backgroundColor: theme.palette.text.secondary,
    overflowY: "auto",
    height: "20vh",
    scrollbarWidth: "thin",
    scrollbarColor: `${theme.palette.primary.main} ${theme.palette.primary.contrastText}`,
  },
  dragContainer: {
    textAlign: "center"
  },
  list: {
    listStyleType: "none",
    paddingInlineStart: 0,
    justifyContent: "center"
  }
}));
const playlist = [
    {
      id: 'utp',
      name: 'Uptown Funk'
    },
    {
      id: 'pra',
      name: 'Party Rock Anthem'
    },
    {
      id: 'igf',
      name: 'I Gotta Feeling'
    },
    {
      id: 'dsd',
      name: 'Party Rock Anthem 2'
    },
    {
      id: 'fsf',
      name: 'I Gotta Feeling 2'
    }
  ]
function Playlist({title, importable, editable}) {
    const [playlistItems, updatePlaylistItems] = useState(playlist);

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
          <Typography variant="h2">
              {title}
          </Typography> : <Typography/>}
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
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className={classes.dragBox}>
          <Droppable droppableId="playlist" className={classes.dragContainer}>
            {(provided) => (
              <ul className={classes.list} {...provided.droppableProps} ref={provided.innerRef}>
                {playlistItems.map(({id, name}, index) => {
                  return (
                    <Draggable key={id} draggableId={id} index={index}>
                      {(provided) => (
                        <Card className={classes.card} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                          <p>
                            { name }
                          </p>
                        </Card>
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