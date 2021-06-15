import socket from "../../socketIo";

export const sendMessage = (message, receiverId) => {
	return async (dispatch) => {
		let newMessage = {
			...message,
			receiverId,
		};
		socket.emit("Message", newMessage);
	};
};
