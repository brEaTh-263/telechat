import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useSelector } from "react-redux";
import Colors from "../constants/Colors";
import InitialScreen from "../screens/InitialScreen";
import AuthNavigator from "./AuthNavigator";
import HomeNavigator from "./HomeNavigator";

const AppNavigator = () => {
	const Auth = useSelector((state) => state.Auth);
	const { isAuth, didTryAutoLogin } = Auth;
	return (
		<NavigationContainer theme={{ colors: { background: Colors.background } }}>
			{!isAuth && !didTryAutoLogin && <InitialScreen />}
			{!isAuth && didTryAutoLogin && <AuthNavigator />}
			{isAuth && <HomeNavigator />}
		</NavigationContainer>
	);
};

export default AppNavigator;
