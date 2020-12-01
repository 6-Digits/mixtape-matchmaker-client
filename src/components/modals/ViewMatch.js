import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, Button, DialogTitle, TextField, Typography, Grid, Box } from '@material-ui/core';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import MatchChatCard from "../modules/MatchChatCard";
import matchData from "../data/matches.json";
import useChat from "./useChat";
import ViewChat from "./ViewChat";

// Need to adjust for mobile view in the future
const useStyles = makeStyles((theme) => ({
	container: {
		width: "100%",
		height: "100%"
	},
	button: {
		margin: theme.spacing(3, 0, 2),
		fontWeight: "bold",
		fontFamily: "Arial Black",
		fontSize: "1.5rem"
	},
	modal: {
	},
	content: {
		marginLeft: "1rem"
	},
	modalTitle: {
		fontSize: "2rem",
		fontWeight: "bold"
	},
	dragBox: {
		padding: "1rem 2rem 1rem 0rem",
		borderRadius: "0.25rem",
		backgroundColor: theme.palette.background.default,
		overflowY: "auto",
		height: "60vh"
	},
	card: {
		marginTop: "1rem",
	},
	messageBoard: {
		padding: "1rem 1rem 1rem 2rem",
		backgroundColor: theme.palette.background.default,
		overflowY: "auto",
		height: "50vh",
		borderRadius: "0.25rem",
		width: "100%"
	},
	myMessage: {
		width: "55%",
		margin: "8px",
		padding: "12px 8px",
		borderRadius: "4px",
		backgroundColor: "#0084ff",
		marginLeft: "auto",
	},
	receivedMessage: {
		width: "55%",
		margin: "8px",
		padding: "12px 8px",
		borderRadius: "4px",
		backgroundColor: "#3f4042",
		marginRight: "auto",
	},
	message: {
		marginTop: "1rem",
		padding: "1rem 1rem 1rem 1rem",
		backgroundColor: theme.palette.background.paper,
		borderRadius: "0.5rem",
	},
	messageText: {
		fontSize: "1.5rem",
		color: theme.palette.text.primary
	},
	messageTS: {
		fontsize: "0.5rem",
		color: theme.palette.text.disabled
	},
	sendMsgComponent: {
		width: "100%",
		height: "5vh",
		marginBottom: "5rem"
	},
	enterMessageField: {
		marginLeft: "-1.5rem",
		width: "115%",
		height: "4vh"
	},
	sendMsgIcon: {
		width: "100%",
		height: "5vh"
	},
	sendMessageButton: {
		width: "80%",
		height: "100%",
		marginLeft: "3.5rem",
		marginTop: "1.5rem"
	}
}));

const matchedPeople = matchData['people'];

//const messageLog = matchData['messages'];

// Should not be hardcoded in later implementations
const roomId = "5fb5a9f39b71118664cd1c8e";
const api = 'http://localhost:42069/api';


function ViewMatch(props) {
	const classes = useStyles();
	const [matches, setMatches] = useState(matchedPeople);
	const [chats, setChats] = useState([]);
	const [open, setOpen] = useState(false);
	const [currentChat, setCurrentChat] = useState(0);
	const [reloadChat, setReloadChat] = useState(false);

	const fetchMyChats = async(user) => {
		let requestOptions = {
			method: 'GET',
			headers: {'Content-Type': 'application/json', /*'x-access-token': userToken*/}
		};
		let response = await fetch(`${api}/match/chat/uid/${user._id}`, requestOptions);
		if(response.status <= 400) {
			let data = await response.json();
			setChats(data);
		}else{
			setChats([]);
		}
	};

	useEffect(() => {
		fetchMyChats(props.user)
	}, [currentChat]);

	function handleOnDragEnd(result) {
		if (!result.destination) {
			return;
		}
		const items = Array.from(matches);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setMatches(items);
	}
	const handleSelectedChat = (index) => {
		setCurrentChat(index)
	}
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.container}>
			<Button className={classes.button} onClick={handleOpen} variant="contained" fullWidth color="primary">{"View Matches"}</Button>
			<Dialog
				fullWidth={true}
				maxWidth="lg" className={classes.modal} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">

				<Grid container direction="row" justify="space-between" alignItems="center">
					<Grid item xs={12} sm={6}>
						<DialogTitle disableTypography id="form-dialog-title" className={classes.modalTitle}>My Matches</DialogTitle>
					</Grid>

					<Grid item xs={12} sm={1} className={classes.importGrid}>
						<DialogActions>
							<Button variant="contained" onClick={handleClose} color="secondary" className={classes.cancel}>
								Exit
							</Button>
						</DialogActions>
					</Grid>
				</Grid>

				<Grid
					container
					direction="row"
					justify="flex-start"
					spacing={2}
					alignItems="center"
					className={classes.content}
				>
					<Grid
						item xs={12} sm={4}>
						<DragDropContext onDragEnd={handleOnDragEnd}>
							<div className={classes.dragBox}>
								<Droppable droppableId="playlist" className={classes.dragContainer}>
									{(provided) => (
										<ul className={classes.list} {...provided.droppableProps} ref={provided.innerRef}>
											{chats.map((chat, index) => {
												return (
													<Draggable key={chat._id} draggableId={chat._id} index={index} isDragDisabled={true}>
														{(provided) => (
															<div className={classes.card} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
																<MatchChatCard
																	recipient={chat.recipient}
																	id={chat._id}
																	handleSelectedChat={handleSelectedChat}
																	index={index}
																></MatchChatCard>
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
					</Grid>
					<ViewChat user={props.user} currentChat={chats[currentChat]}></ViewChat>
				</Grid>
			</Dialog>
		</div>
	);
}

export default ViewMatch;