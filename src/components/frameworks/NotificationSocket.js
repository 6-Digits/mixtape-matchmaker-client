import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const api = window.location.protocol+'//'+window.location.hostname+':42069/api';
const NEW_NOTIFICATION_EVENT = "newNotificationEvent";
const SOCKET_SERVER_URL = window.location.protocol+'//'+window.location.hostname+":5000";

const NotificationSocket = (roomId, user) => {
	const [notifications, setNotifications] = useState([]);
	const socketRef = useRef();
	const fetchNotifications = async () => {
		let requestOptions = {
			method: 'GET',
			headers: {'Content-Type': 'application/json'}
		};
		let response = await fetch(`${api}/profile/notifications/uid/${user._id}`, requestOptions);
		if(response.status === 200) {
			let data = await response.json();
			setNotifications(data);
		}else {
			setNotifications([]);
		}
	};

	useEffect(()=>{
		fetchNotifications();
	}, [user]);

	useEffect(() => {
		if (roomId == ""){
			return
		}
		socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
			query: { roomId },
		});
		//setNotifications([]);
		// Basically listens to a response from the server
		socketRef.current.on(NEW_NOTIFICATION_EVENT, (notification) => {
			//alert(JSON.stringify(notification))
			//const incomingNotification = {
			//	...notification,
			//};
			//setNotifications((notifications) => [...notifications, incomingNotification]);
			//setMessages([incomingMessage])
			// Fetch directly from the database to avoid errors
			fetchNotifications()
		});

		return () => {
			socketRef.current.disconnect();
		};
	}, []);
	
	// The function below notifies the server of a new message
	const sendNotification = (messageBody, reciever) => {
		socketRef.current.emit(NEW_NOTIFICATION_EVENT, {
			creator: user,
			message: messageBody,
			date: new Date().toISOString(),
			// Reciever is hard-coded right now but should be dynamic
			reciever: reciever,
			senderId: socketRef.current.id,
		});
	};
	return { notifications, sendNotification, setNotifications};
};

export default NotificationSocket;