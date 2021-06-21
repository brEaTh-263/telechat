import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import SearchUserScreen from "../screens/SearchUserScreen";
import ChatScreen from "../screens/ChatScreen";
import OtpScreen from "../screens/OtpScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ProfileScreen from "../screens/ProfileScreen";

const HomeStackNavigator = createStackNavigator();

const HomeNavigator = () => {
	return (
		<HomeStackNavigator.Navigator screenOptions={{ headerShown: false }}>
			<HomeStackNavigator.Screen name="Home" component={HomeScreen} />
			<HomeStackNavigator.Screen
				name="SearchUsers"
				component={SearchUserScreen}
			/>
			<HomeStackNavigator.Screen name="Chat" component={ChatScreen} />
			<HomeStackNavigator.Screen name="Settings" component={SettingsScreen} />
			<HomeStackNavigator.Screen name="Profile" component={ProfileScreen} />
		</HomeStackNavigator.Navigator>
	);
};

export default HomeNavigator;
