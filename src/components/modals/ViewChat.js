import React, { useState, useEffect } from "react";
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import { Dialog, DialogActions, Button, DialogTitle, TextField, Typography, Grid, Box } from '@material-ui/core';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Send as SendIcon } from '@material-ui/icons';

import useChat from "./useChat";

const useStyles = makeStyles((theme) => ({
    messageBoard: {
        padding: "1rem 1rem 1rem 2rem",
        backgroundColor: theme.palette.text.secondary,
        overflowY: "auto",
        height: "50vh",
        borderRadius: "0.25rem",
        width: "100%"
    },
    myMessage: {
        width: "50%",
        margin: "8px",
        padding: "12px 8px",
        borderRadius: "4px",
        backgroundColor: "#0084ff",
        marginLeft: "auto",
    },
    receivedMessage: {
        width: "50%",
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
}))

function ViewChat(props) {
    //let roomId = "5fc4575cd83f8fcbb7a5139d"
    //(JSON.stringify(props.currentChat))
    const classes = useStyles();
    const [oldMessages, setOldMessages] = useState(props.currentChat.messages);
    const { messages, sendMessage } = useChat(props.currentChat._id, props.user);
    const [newMessage, setNewMessage] = useState("");

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
            <Grid
                container
                direction="column"
                justify="space-evenly"
                alignItems="center"
                item xs={12} sm={12}
            >
                {/*Sent Message portion*/}
                <Box
                    className={classes.messageBoard}>
                    {oldMessages.map((message, i) => (
                        <Grid
                            key={i}
                            className={message.user == props.user._id ? `${classes.myMessage}` : `${classes.receivedMessage}`}
                        >
                        {message.text}
                        </Grid>
                    ))}
                    {messages.map((message, i) => (
                        <Grid
                            key={i}
                            className={message.ownedByCurrentUser ? `${classes.myMessage}` : `${classes.receivedMessage}`}
                        >
                            {message.body}
                        </Grid>
                    ))}
                </Box>
                {/*Sending message portion*/}
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
                            value={newMessage}
                            onChange={handleNewMessageChange}
                            type="text"
                            multiline={true}
                            rows={2}
                            id="send-message"
                            className={classes.enterMessageField}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button variant="contained" onClick={handleSendMessage} className={classes.sendMessageButton}>
                            <SendIcon className={classes.sendMsgIcon} />
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default ViewChat;