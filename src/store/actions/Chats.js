export const GET_ALL_ROOMS = "GET_ALL_ROOMS";
export const PUSH_MESSAGE = "PUSH_MESSAGE";
export const GET_ROOM_DETAILS = "GET_ROOM_DETAILS";
export const SHOW_NEW_MESSAGES = "SHOW_NEW_MESSAGES";
export const RESET_NEW_MESSAGES = "RESET_NEW_MESSAGES";
export const REWRITE_MESSAGES = "REWRITE_MESSAGES";

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

export const showNewMessages = (roomId, msg) => {
	return async (dispatch) => {
		dispatch({ type: SHOW_NEW_MESSAGES, payload: { roomId, msg } });
	};
};

export const rewriteMessages = (msg, roomId) => {
	return async (dispatch) => {
		dispatch({ type: REWRITE_MESSAGES, payload: { roomId, msg } });
	};
};

export const resetNewMessages = (roomId) => {
	return async (dispatch) => {
		dispatch({ type: RESET_NEW_MESSAGES, payload: { roomId } });
	};
};
