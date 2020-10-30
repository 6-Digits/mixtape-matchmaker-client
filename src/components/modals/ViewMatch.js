import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogActions, Button, DialogTitle, TextField, Typography, Grid, Box} from '@material-ui/core';
import { Send as SendIcon } from '@material-ui/icons';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import MatchChatCard from "../modules/MatchChatCard";

// Need to adjust for mobile view in the future

const useStyles = makeStyles((theme) => ({
	container: {
		width:"100%",
		height:"100%"
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
		backgroundColor: theme.palette.text.secondary,
		overflowY: "auto",
		height: "60vh"
	}, 
	card: {
		marginTop: "1rem",
	},
	messageBoard: {
		padding: "1rem 1rem 1rem 2rem",
		backgroundColor: theme.palette.text.secondary,
		overflowY: "auto",
		height: "55vh",
		borderRadius: "0.25rem",
		width: "100%"
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
		marginBottom: "1rem"
	},
	enterMessageField: {
		marginLeft: "-1.5rem",
		width: "115%",
		height: "5vh"
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

const matchedPeople = [
	{
		id: "123",
		name: "Jason"
	},
	{
		id: "123bhgf",
		name: "Darren"
	},
	{
		id: "123asdcvx",
		name: "Farhan"
	},
	{
		id: "123gfdfg",
		name: "Rick"
	},
	{
		id: "123asf",
		name: "Kakarot"
	},
	{
		id: "123123sa",
		name: "Rito Yuki"
	}
]

const messageLog = [
	{
		message: "Hello there",
		user: "Kenobi",
		timestamp: "2005-05-20T00:00:00.000Z"
	},
	{
		message: "General Kenobi",
		user: "Grievous",
		timestamp: "2005-05-20T00:00:00.000Z"
	},
	{
		message: "Hello there",
		user: "Kenobi",
		timestamp: "2005-05-20T00:00:00.000Z"
	},
	{
		message: "General Kenobi",
		user: "Grievous",
		timestamp: "2005-05-20T00:00:00.000Z"
	},
	{
		message: "Hello there",
		user: "Kenobi",
		timestamp: "2005-05-20T00:00:00.000Z"
	},
	{
		message: "General Kenobi",
		user: "Grievous",
		timestamp: "2005-05-20T00:00:00.000Z"
	},
	{
		message: "Hello there",
		user: "Kenobi",
		timestamp: "2005-05-20T00:00:00.000Z"
	},
	{
		message: "General Kenobi",
		user: "Grievous",
		timestamp: "2005-05-20T00:00:00.000Z"
	}
];

function ViewMatch(props) {
	const classes = useStyles();
	const [matches, setMatches] = useState(matchedPeople);
	const [messages, setMessages] = useState(messageLog);
	const [open, setOpen] = useState(false);
	
	function handleOnDragEnd(result) {
		if (!result.destination) {
			return;
		}
		const items = Array.from(matches);
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);
		setMatches(items);
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
						<DialogTitle disableTypography  id="form-dialog-title" className={classes.modalTitle}>My Matches</DialogTitle>
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
											{matches.map(({id, name}, index) => {
												return (
													<Draggable key={id} draggableId={id} index={index} isDragDisabled={true}>
														{(provided) => (
															<div className={classes.card} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
																<MatchChatCard 
																	name={name}
																	id={id}
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
					</Grid>
					<Grid
						container
						direction="column"
						justify="space-evenly"
						alignItems="center"
						item xs={12} sm={6}
						>
						<Box
						className={classes.messageBoard}>
							{
								messages.map(({message, user, timestamp},index) => {
									return( 
									<Grid
										container 
										direction="column"
										justify="flex-start"
										alignItems="flex-start"
										className={classes.message}>
										<Typography disableTypography className={classes.messageText}>{`${user}: ${message}`}</Typography>
										<Typography disableTypography className={classes.messageTS}>{timestamp}</Typography>
									</Grid>
									);
								})
							}
						</Box>
						<Grid
							container
							justify="space-between"
							alignItems="center"
							fullWidth
							className={classes.sendMsgComponent}
							>
							<Grid item xs={12} sm={9}>
								<TextField
									variant="outlined"
									fullWidth
									name="send-message"
									label="Enter a message"
									type="text"
									multiline={true}
									rows={2}
									id="send-message"
									className={classes.enterMessageField}
									/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Button variant="contained" className={classes.sendMessageButton}>
									<SendIcon className={classes.sendMsgIcon}/>
								</Button>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Dialog>
		</div>
	);
}

export default ViewMatch;