import {
	GET_ALL_ROOMS,
	GET_ROOM_DETAILS,
	PUSH_MESSAGE,
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
		default: {
			return state;
		}
	}
};
