import { SIGN_IN } from "../actions/auth";

const initialState = {
	token: "",
	didTryAutoLogin: false,
	isAuth: false,
	_id: "",
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN: {
			return {
				isAuth: true,
				didTryAutoLogin: true,
				token: action.payload.token,
				_id: action.payload._id,
			};
		}
		default: {
			return state;
		}
	}
};
