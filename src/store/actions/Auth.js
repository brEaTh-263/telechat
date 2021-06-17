import { url } from "../../constants/url";
export const DID_TRY_AUTO_LOGIN = "DID_TRY_AUTO_LOGIN";
export const SIGN_IN = "SIGN_IN";
export const AUTO_LOGIN = "AUTO_LOGIN";

export const setDidTryAutoLogin = () => {
	return async (dispatch) => {
		dispatch({ type: DID_TRY_AUTO_LOGIN });
	};
};

export const autoLogIn = (token) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`${url}/auth/autoLogIn`, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": token,
				},
			});
			const responseJson = await response.json();
			if (response.status != 200) {
				throw new Error(responseJson.Error);
			}
			dispatch({
				type: SIGN_IN,
				payload: responseJson,
			});
		} catch (error) {
			throw new Error();
		}
	};
};
export const signIn = (phoneNumber) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`${url}/auth/sign-in`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					phoneNumber,
				}),
			});
			if (response.ok) {
				const responseJson = await response.json();
			} else {
				throw new Error();
			}
		} catch (error) {
			console.log(error);
			throw new Error();
		}
	};
};

export const authenticatePhoneNumber = (name, code, phoneNumber) => {
	return async (dispatch) => {
		try {
			const response = await fetch(`${url}/auth/authenticate-phonenumber`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					phoneNumber,
					name,
					code,
				}),
			});
			if (response.ok) {
				const responseJson = await response.json();
				dispatch({ type: SIGN_IN, payload: responseJson });
			} else {
				throw new Error();
			}
		} catch (error) {
			console.log(error);
			throw new Error();
		}
	};
};
