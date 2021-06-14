import { useCallback, useState } from "react";
import { url } from "../constants/url";

export default () => {
	const [users, setUsers] = useState([]);
	const getUsers = useCallback(async (query) => {
		try {
			const response = await fetch(`${url}/user/search-user`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
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
