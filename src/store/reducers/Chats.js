import {} from "../actions/Chats";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
	rooms: [],
};

export default (state = initialState, action) => {
	switch (action.type) {
		default: {
			return state;
		}
	}
};
