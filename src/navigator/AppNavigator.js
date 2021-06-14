import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useSelector } from "react-redux";
import AuthNavigator from "./AuthNavigator";
import HomeNavigator from "./HomeNavigator";

const AppNavigator = () => {
	const Auth = useSelector((state) => state.Auth);
	const { isAuth } = Auth;
	return (
		<NavigationContainer>
			{!isAuth && <AuthNavigator />}
			{isAuth && <HomeNavigator />}
		</NavigationContainer>
	);
};

export default AppNavigator;
