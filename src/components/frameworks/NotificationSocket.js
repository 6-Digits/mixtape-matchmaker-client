import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_NOTIFICATION_EVENT = "newNotificationEvent";
const SOCKET_SERVER_URL = "http://localhost:5000";

const NotificationSocket = (roomId, user) => {
	const [notifications, setNotifications] = useState([]);
	const socketRef = useRef();

	useEffect(() => {
		socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
			query: { roomId },
		});
		//setNotifications([]);
		socketRef.current.on(NEW_NOTIFICATION_EVENT, (notification) => {
			//alert(JSON.stringify(message))
			const incomingNotification = {
				...notification,
				ownedByCurrentUser: notification.senderId === socketRef.current.id,
				chatID : roomId,
			};
			setNotifications((notifications) => [...notifications, incomingNotification]);
			//setMessages([incomingMessage])
		});

		return () => {
			socketRef.current.disconnect();
		};
	}, []);
	
	// The function below notifies the server of a new message
	const sendNotification = (messageBody) => {
		socketRef.current.emit(NEW_NOTIFICATION_EVENT, {
			creator: user,
			message: messageBody,
			date: new Date().toISOString(),
			reciever: '5fc2f2f1af6ba41d1877a165',
			senderId: socketRef.current.id,
		});
	};

	return { notifications, sendNotification };
};

export default NotificationSocket;