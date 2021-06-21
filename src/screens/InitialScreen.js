import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/Auth";
import LoadingScreen from "./LoadingScreen";

const InitialScreen = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const fetchData = async () => {
			const token = await AsyncStorage.getItem("token");
			console.log(token);
			if (token) {
				try {
					await dispatch(authActions.autoLogIn(token));
				} catch (error) {
					dispatch(authActions.setDidTryAutoLogin());
				}
			} else {
				dispatch(authActions.setDidTryAutoLogin());
			}
		};
		fetchData();
	}, [dispatch]);

	return <LoadingScreen />;
};

export default InitialScreen;
