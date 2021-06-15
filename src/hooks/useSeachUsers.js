import { useCallback, useState } from "react";
import { url } from "../constants/url";
import { useSelector } from "react-redux";

export default () => {
	const [users, setUsers] = useState([]);
	const token = useSelector((state) => state.Auth.token);
	const getUsers = useCallback(async (query) => {
		try {
			const response = await fetch(`${url}/user/search-user`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": token,
				},
				body: JSON.stringify({ query }),
			});
			const responseJson = await response.json();
			setUsers(responseJson);
		} catch (error) {
			console.log(error);
			throw new Error();
		}
	}, []);
	return [getUsers, users, setUsers];
};
