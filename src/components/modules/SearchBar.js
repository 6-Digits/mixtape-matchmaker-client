import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, InputBase, Button, Menu, MenuItem, MenuList, Grow, Paper, Popper, Fade, ClickAwayListener } from '@material-ui/core';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import { LibraryAdd as LibraryAddIcon, Sort as SortIcon, Search as SearchIcon, Undo as UndoIcon, Redo as RedoIcon, Share as ShareIcon } from '@material-ui/icons';
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
	input: {
		height: "80vh" ,
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
        width: "100%"
	},
	inputInput: {
		padding: theme.spacing(2, 2, 2, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
    },
    popper: {
        width: '50%'
    }
}));
const api = 'http://localhost:42069/api';

function SearchBar({editable, search, setSearch, local}) {
    const [loading, setLoading] = useState(true);
    const [typed, setTyped] = useState("");
    const [open, setOpen] = useState(true);
    const [options, setOptions] = useState([]);
    const [canceled, setCanceled] = useState(false);
    const [timeout, setTimeOut] = useState(null);
    // const controller = new window.AbortController();
    // const { signal } = controller;

    const id = 'search-popper';
    const anchorRef = useRef(null);
    const classes = useStyles();

    useEffect(() => {
        if(search.length > 2) {
            setLoading(true);
            populateSearch();
        } else {
            setLoading(false);
            setOptions([]);
        }
      }, [search]);
    
    const populateSearch = async() => {
		let userToken = localStorage.getItem('userToken');
		let requestOptions = {
			method: 'GET',
            headers: {'Content-Type': 'application/json', 'x-access-token': userToken},
        };
		let response = await fetch(api + '/youtube/search/' + search, requestOptions);
		if(response.status === 200) {
            let data = await response.json();
            setOptions(data['results'].slice(0,5));
            setOpen(true);
            setLoading(false);
		}
    };
    const onSearch = (event) => {
        setTyped(event.target.value);
        clearTimeout(timeout);
        // Make a new timeout set to go off in 1000ms (1 second)
        setTimeOut(setTimeout(function () {
            setSearch(typed);
        }, 1000));
    }

    const handleClose = () => {
        setOpen(false);
    }

	return (
        <div className={classes.search}>
            <div className={classes.searchIcon}>
                    {loading ? <CircularProgress/> :
                    <SearchIcon /> }
            </div>
            <InputBase
                ref={anchorRef}
                aria-describedby={id}
                value={typed}
                onChange={onSearch}
                placeholder={editable ? "Songs to add..." : "Search playlist song..."}
                classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search'}}
            />
            <Popper className={classes.popper} id={id} open={open} 
                anchorEl={anchorRef.current} transition placement="bottom-start">
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps}>
                        <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="popper-menu-list">
                                {options.map((value, index) => {
                                    return <MenuItem>{value['title']}</MenuItem>;
                                })}
                            </MenuList>
                        </ClickAwayListener>
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </div>
	);
}

export default SearchBar;