import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import GetStartedScreen from "../screens/GetStartedScreen";
import SignInScreen from "../screens/SignInScreen";
import OtpScreen from "../screens/OtpScreen";
import SearchUserScreen from "../screens/SearchUserScreen";
const AuthStackNavigator = createStackNavigator();

const AuthNavigator = () => {
	return (
		<AuthStackNavigator.Navigator screenOptions={{ headerShown: false }}>
			<AuthStackNavigator.Screen
				name="GetStarted"
				component={GetStartedScreen}
			/>
			<AuthStackNavigator.Screen name="SignIn" component={SignInScreen} />
			<AuthStackNavigator.Screen name="Otp" component={OtpScreen} />
		</AuthStackNavigator.Navigator>
	);
};

export default AuthNavigator;
