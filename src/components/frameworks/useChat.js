import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = window.location.protocol+'//'+window.location.hostname+":4000";
const useChat = ({roomId, user}) => {
	const [messages, setMessages] = useState([]);
	const socketRef = useRef();

	useEffect(() => {
		socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
			query: { roomId },
		});

		setMessages([]);

		socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
			//alert(JSON.stringify(message))
			const incomingMessage = {
				...message,
				ownedByCurrentUser: message.senderId === socketRef.current.id,
				chatID : roomId,
			};
			setMessages((messages) => [...messages, incomingMessage]);
			//setMessages([incomingMessage])
		});

		return () => {
			socketRef.current.disconnect();
		};
	}, [roomId]);
	
	// The function below notifies the server of a new message
	const sendMessage = (messageBody) => {
		socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
			user: user,
			body: messageBody,
			date: new Date().toISOString(),
			senderId: socketRef.current.id,
		});
	};

	return { messages, sendMessage };
};

export default useChat;