import { url } from "../../constants/url";

export const SIGN_IN = "SIGN_IN";
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
