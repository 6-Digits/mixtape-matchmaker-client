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
    }
}))

function ViewChat(props) {
    //let roomId = "5fc4575cd83f8fcbb7a5139d"
    //(JSON.stringify(props.currentChat))
    //alert(props.currentChat._id)
    const classes = useStyles();
    const [oldMessages, setOldMessages] = useState(props.currentChat ? props.currentChat.messages : []);
    const textFieldRef = React.createRef();
    const { messages, sendMessage } = useChat(props.currentChat ? props.currentChat._id : "", props.user);
    const [newMessage, setNewMessage] = useState("");
    const [buttonHeight, setButtonHeight] = useState("100%");

    useEffect(() => {
        setOldMessages(props.currentChat ? props.currentChat.messages : [])
        //STYLE THE BUTTON SO THE SIZE WILL BE ADAPTIVE
        if(textFieldRef.current){
            setButtonHeight(textFieldRef.current.offsetHeight);
        }
    }, [props.currentChat ? props.currentChat._id : null, textFieldRef.current]);

    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        // Ensures not sending an empty message
        if (newMessage !== "") {
            sendMessage(newMessage);
            //alert(JSON.stringify(messages))
            // let temp = oldMessages.map((message) => message)
            // temp.push({
            //     user : props.user._id,
            //     text : newMessage
            // })
            // setOldMessages(temp)
            setNewMessage("");
        }
    };
    return (
        <div>
            {/*Sent Message portion*/}
            <Box
                className={classes.messageBoard}>
                {props && props.user && props.match && props.currentChat ? 
                oldMessages.map((message, i) => (
                    message ?
                    <div className={classes.card}>
                        <div className={message.user === props.user._id ? classes.cardMyMessage : classes.cardReceivedMessage}>
                            <div
                                key={i}
                                className={message.user === props.user._id ? classes.myMessage : classes.receivedMessage}
                            >
                            <Grid container direction="column" className={classes.message}>
                                <Grid item>
                                    {`${message.user !== props.user._id ? `${props.match.name}: ` : ""}${message.text}`}
                                </Grid>  
                                <Grid item className={classes.messageTime}> 
                                    {message.date}
                                </Grid>  
                            </Grid>
                            </div>
                        </div>
                    </div> : null
                )) : null }
                { props.user && props.match && props.currentChat ? 
                messages.filter(message => message.chatID === props.currentChat ? props.currentChat._id : "").map((message, i) => (
                    message ? 
                    <div className={classes.card}>
                        <div className={message.user === props.user._id ? classes.cardMyMessage : classes.cardReceivedMessage }>
                            <div
                                key={i}
                                className={message.user === props.user._id ? classes.myMessage : classes.receivedMessage}
                            >
                                <Grid container direction="column" className={classes.message}>
                                    <Grid item>
                                        {`${message.user !== props.user._id ? `${props.match.name}: ` : ""}${message.text}`}
                                    </Grid>  
                                    <Grid item className={classes.messageTime}> 
                                        {message.date}
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