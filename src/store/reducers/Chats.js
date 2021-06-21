import {
	GET_ALL_ROOMS,
	GET_ROOM_DETAILS,
	PUSH_MESSAGE,
	RESET_NEW_MESSAGES,
	SHOW_NEW_MESSAGES,
} from "../actions/Chats";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
	rooms: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_ALL_ROOMS: {
			return {
				rooms: action.payload,
			};
		}
		case GET_ROOM_DETAILS: {
			let newRooms = state.rooms.concat(action.payload);
			return {
				rooms: newRooms,
			};
		}
		case PUSH_MESSAGE: {
			const roomId = action.payload.roomId;
			const editedRooms = state.rooms.map((room) => {
				if (room._id === roomId) {
					room.messages.push(action.payload.msg);
				}
				return room;
			});
			return {
				rooms: editedRooms,
			};
		}
		case SHOW_NEW_MESSAGES: {
			const roomId = action.payload.roomId;
			const editedRooms = state.rooms.map((room) => {
				if (room._id === roomId) {
					// console.log("INITIAL ROOM COUNT");
					// console.log(room.count);
					if (room.count > 0) {
						room.count += 1;
					} else {
						room.count = 1;
					}
					// console.log("FINAL ROOM COUNT");
					// console.log(room.count);
				}
				return room;
			});
			return {
				rooms: editedRooms,
			};
		}
		case RESET_NEW_MESSAGES: {
			const roomId = action.payload.roomId;
			const editedRooms = state.rooms.map((room) => {
				if (room._id === roomId) {
					// console.log("INITIAL ROOM COUNT");
					// console.log(room.count);
					if (room.count) {
						room.count = 0;
					}
					// console.log("FINAL ROOM COUNT");
					// console.log(room.count);
				}
				return room;
			});
			return {
				rooms: editedRooms,
			};
		}
		default: {
			return state;
		}
	}
};
