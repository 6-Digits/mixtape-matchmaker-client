import React, { useState, useEffect, createRef } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Grid, Box } from '@material-ui/core';
import { Send as SendIcon } from '@material-ui/icons';

import useChat from "../frameworks/useChat";

const useStyles = makeStyles((theme) => ({
	messageBoard: {
		padding: "1rem 1rem 1rem 2rem",
		backgroundColor: theme.palette.text.secondary,
		overflowY: "auto",
		height: "53vh",
		borderRadius: "0.25rem",
		width: "100%"
	},
	card: {
		display: "block",
		width: "100%",
		marginBottom: "1rem"
	},
	cardMyMessage: {
		display: "flex",
		justifyContent: 'flex-end',
	},
	cardReceivedMessage: {
		display: "flex",
		justifyContent: 'flex-start',
	},
	myMessage: {
		borderRadius: "0.25rem",
		backgroundColor: theme.palette.primary.dark,
		display: "inline-block"
	},
	receivedMessage: {
		borderRadius: "0.25rem",
		backgroundColor: theme.palette.background.paper,
		display: "inline-block"
	},
	message: {
		padding: "0.5rem",
		fontSize: "1.5rem",
	},
	messageTime: {
		fontSize: "0.5rem",
	}, 
	sendMsgComponent: {
		marginTop: "1rem"
	}, 
	sendMessageButton: {
		width: '100%'
	}
}))

function ViewChat({user, chat}) {
	const classes = useStyles();
	const textFieldRef = createRef();
	
	const [oldMessages, setOldMessages] = useState(chat ? chat.messages : []);
	const { messages, sendMessage } = useChat(chat ? chat._id : "", user);
	const [newMessage, setNewMessage] = useState("");
	const [buttonHeight, setButtonHeight] = useState("100%");

	useEffect(() => {
		setOldMessages(chat ? chat.messages : [])
	}, [chat ? chat._id : null, messages]);

	useEffect(() => {
		//STYLE THE BUTTON SO THE SIZE WILL BE ADAPTIVE
		if(textFieldRef.current){
			setButtonHeight(textFieldRef.current.offsetHeight);
		}

	})
	
	const handleNewMessageChange = (event) => {
		setNewMessage(event.target.value);
	};

	const handleSendMessage = () => {
		// Ensures not sending an empty message
		if (newMessage !== "") {
			sendMessage(newMessage);
			setNewMessage("");
		}
	};
	
	return (
		<div>
			{/*Sent Message portion*/}
			<Box
				className={classes.messageBoard}>
				{ user && chat ? 
				oldMessages.map((message, i) => (
					message ?
					<div className={classes.card}>
						<div className={message.user === user._id ? classes.cardMyMessage : classes.cardReceivedMessage}>
							<div
								key={i}
								className={message.user === user._id ? classes.myMessage : classes.receivedMessage}
							>
							<Grid container direction="column" className={classes.message}>
								<Grid item>
									{message.text}
								</Grid>  
								<Grid item className={classes.messageTime}> 
									{`${new Date(message.date).toLocaleDateString()} ${new Date(message.date).toLocaleTimeString()}`}
								</Grid>  
							</Grid>
							</div>
						</div>
					</div> : null
				)) : null }
				{ user && chat ? 
				messages.filter(message => message.chatID === chat._id).map((message, i) => (
					message ? 
					<div className={classes.card}>
						<div className={message.ownedByCurrentUser ? classes.cardMyMessage : classes.cardReceivedMessage }>
							<div
								key={i}
								className={message.ownedByCurrentUser ? classes.myMessage : classes.receivedMessage}
							>
								<Grid container direction="column" className={classes.message}>
									<Grid item>
										{message.body}
									</Grid>  
									<Grid item className={classes.messageTime}> 
										{`${new Date(message.date).toLocaleDateString()} ${new Date(message.date).toLocaleTimeString()}`}
									</Grid>  
								</Grid>
							</div>
						</div>
					</div> : null
				)) : null}
			</Box>
			{/*Sending message portion*/}
			<Grid
				container
				justify="space-between"
				alignItems="flex-start"
				fullWidth
				className={classes.sendMsgComponent}
			>
				<Grid item xs={9} container
						className={classes.enterMessageField}>
					<TextField
						ref={textFieldRef}
						variant="outlined"
						fullWidth
						name="send-message"
						label="Enter a message"
						value={newMessage}
						onChange={handleNewMessageChange}
						type="text"
						multiline={true}
						rows={2}
						id="send-message"
					/>
				</Grid>
				<Grid item xs={3} container style={{height: buttonHeight}}>
					<Button variant="contained" onClick={handleSendMessage} className={classes.sendMessageButton}>
						<SendIcon className={classes.sendMsgIcon} />
					</Button>
				</Grid>
			</Grid>
		</div>
	)
}

export default ViewChat;