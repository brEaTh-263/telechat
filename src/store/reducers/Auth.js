import { DID_TRY_AUTO_LOGIN, SIGN_IN } from "../actions/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
	token: "",
	didTryAutoLogin: false,
	isAuth: false,
	_id: "",
	name: "",
	displayPicture: "",
};

export default (state = initialState, action) => {
	switch (action.type) {
		case DID_TRY_AUTO_LOGIN: {
			return {
				...state,
				didTryAutoLogin: true,
			};
		}
		case SIGN_IN: {
			AsyncStorage.setItem("token", action.payload.token);
			AsyncStorage.setItem("rooms", JSON.stringify([]));
			AsyncStorage.setItem("_id", action.payload._id);
			return {
				...state,
				isAuth: true,
				didTryAutoLogin: true,
				token: action.payload.token,
				_id: action.payload._id,
				name: action.payload.details.name,
				displayPicture: action.payload.details.displayPicture,
			};
		}
		default: {
			return state;
		}
	}
};
