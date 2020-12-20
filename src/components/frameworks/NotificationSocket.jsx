import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const api = process.env.REACT_APP_API_SERVER;
const NEW_NOTIFICATION_EVENT = "newNotificationEvent";
const SOCKET_SERVER_URL = process.env.REACT_APP_NOTIFICATION_SERVER;

const NotificationSocket = (roomId, user) => {
	const [notifications, setNotifications] = useState([]);
	const socketRef = useRef();
	
	const fetchNotifications = async () => {
		if(user._id){
			let requestOptions = {
				method: 'GET',
				headers: {'Content-Type': 'application/json'}
			};
			let response = await fetch(`${api}/profile/notifications/uid/${user._id}`, requestOptions);
			if (response.status === 200) {
				let data = await response.json();
				setNotifications(data);
			} else {
				setNotifications([]);
			}
		}
	};

	useEffect(()=>{
		if(user){
			fetchNotifications();
		}
	}, [user]);

	useEffect(() => {
		if (roomId == "") {
			return;
		}
		socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
			query: { roomId },
		});
		// Basically listens to a response from the server
		socketRef.current.on(NEW_NOTIFICATION_EVENT, (notification) => {
			// Fetch directly from the database to avoid errors
			fetchNotifications()
		});

		return () => {
			socketRef.current.disconnect();
		};
	}, []);
	
	// The function below notifies the server of a new message
	const sendNotification = (messageBody, receiver) => {
		socketRef.current.emit(NEW_NOTIFICATION_EVENT, {
			creator: user,
			message: messageBody,
			date: new Date().toISOString(),
			// Receiver is hard-coded right now but should be dynamic
			receiver: receiver,
			senderId: socketRef.current.id,
		});
	};
	return { notifications, sendNotification, setNotifications};
};

export default NotificationSocket;