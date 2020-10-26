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
	headerButton: {
		fontSize: 2.5	 + 'rem'
	},
	input: {
		height: "80vh" ,
	},
	playlist: {
		display: "block",
		height: "40vh" ,
	},
	logo: {
		display: "flex",
		margin: "auto",
		height: "25vh",
		width: "25vh"
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		// marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(3),
			width: 'auto',
		}
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
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
		width: '20ch',
		},
    },
    card: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        marginTop: "1rem",
        textAlign: "center",
        fontWeight: "bold"
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
    }
  ]
function Playlist({title, importable, editable}) {
    const [characters, updateCharacters] = useState(playlist);

    function handleOnDragEnd(result) {
      if (!result.destination) return;
  
      const items = Array.from(characters);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
  
      updateCharacters(items);
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
          <Droppable droppableId="characters">
            {(provided) => (
              <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                {characters.map(({id, name}, index) => {
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
        </DragDropContext>
        </div>
	);
}

export default Playlist;