import React, { useState, useEffect, useRef } from "react";
import { Grid, Typography, InputBase, Button, Menu, MenuItem, MenuList, Grow, Paper, Popper, Fade, ClickAwayListener, Avatar} from '@material-ui/core';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import { Search as SearchIcon } from '@material-ui/icons';
import CircularProgress from "@material-ui/core/CircularProgress";
import YouTubeIcon from '@material-ui/icons/YouTube';

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
		width: '50%',
		zIndex: "9999!important"
	},
	songImg: {
		
	},
	searchItem: {
		overflowX: "auto"
	},
	searchSongTitle: {
		overflowX: "auto"
	}
}));
const api = window.location.protocol+'//'+window.location.hostname+':42069/api';

function PlaylistSearchBar({search, setSearch, local, filterSongs, addSong}) {
	const [loading, setLoading] = useState(true);
	const [typed, setTyped] = useState("");
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState([]);
	const [canceled, setCanceled] = useState(false);
	const [timeout, setTimeOut] = useState(null);

	const id = 'search-popper';
	const anchorRef = useRef(null);
	const classes = useStyles();

	useEffect(() => {
		if(search.length > 1) {
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
	
	const onSearchNow = (event) => {
		setTyped(event.target.value);
		setSearch(event.target.value);
	}

	const handleClose = () => {
		setOpen(false);
	}

	return (
		<div className={classes.search}>
			<div className={classes.searchIcon}>
					{loading ? <CircularProgress size={25}/> :
					<SearchIcon /> }
			</div>
			<InputBase
				ref={anchorRef}
				aria-describedby={id}
				value={typed}
				onChange={onSearch}
				placeholder={"Songs to add..."}
				classes={{
					root: classes.inputRoot,
					input: classes.inputInput,
				}}
				inputProps={{ 'aria-label': 'search'}}
				onKeyDown={event => { if (event.key == 'Enter') onSearchNow(event); }}
			/>
			<Popper className={classes.popper} id={id} open={open} 
				anchorEl={anchorRef.current} transition placement="bottom-start">
				{({ TransitionProps }) => (
					<Fade {...TransitionProps}>
						<Paper>
						<ClickAwayListener onClickAway={handleClose}>
							<MenuList autoFocusItem={open} id="popper-menu-list">
								{options.map((value, index) => {
									let duration = value['duration'];
									return <MenuItem 
										className={classes.searchItem}
										onClick={()=>{addSong(value);handleClose();}}>
										<Grid
										direction="row"
										container
										justify="space-evenly"
										alignItems="center">
										<Grid item xs={1} container><YouTubeIcon></YouTubeIcon></Grid>
										<Grid item xs={1} container> <Avatar variant="square" src={value['imgUrl']} className={classes.songImg} /></Grid>
										<Grid item xs={9} container className={classes.searchSongTitle}>{value['title']}</Grid>
										<Grid item xs={1}>{ `${Math.floor(duration / 60)}:${ duration % 60 > 10 ? duration % 60 : '0' + duration % 60}` }</Grid>
										</Grid>
									</MenuItem>;
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

export default PlaylistSearchBar;