export const GET_ALL_ROOMS = "GET_ALL_ROOMS";
export const PUSH_MESSAGE = "PUSH_MESSAGE";
export const GET_ROOM_DETAILS = "GET_ROOM_DETAILS";

export const getAllRooms = (rooms) => {
	return async (dispatch) => {
		dispatch({ type: GET_ALL_ROOMS, payload: rooms });
	};
};

export const pushMessage = (roomId, msg) => {
	return async (dispatch) => {
		dispatch({ type: PUSH_MESSAGE, payload: { roomId, msg } });
	};
};

export const getRoomDetails = (room) => {
	return async (dispatch) => {
		dispatch({ type: GET_ROOM_DETAILS, payload: room });
	};
};
