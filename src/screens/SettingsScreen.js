import React from "react";
import {
	SafeAreaView,
	Text,
	Platform,
	StyleSheet,
	View,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import SettingItem from "../components/SettingItem";

export default function SettingsScreen({ navigation }) {
	const userDetails = useSelector((state) => state.Auth);
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("Home");
						}}
						style={{
							paddingRight: 5,
						}}
					>
						<Ionicons name="arrow-back" size={24} color={Colors.primary} />
					</TouchableOpacity>
					<Text style={styles.headerTitle}>Settings</Text>
				</View>
				<TouchableOpacity
					style={styles.profileContainer}
					onPress={() => navigation.navigate("Profile")}
				>
					<Avatar.Text label={userDetails.name[0].toUpperCase()} size={60} />
					<View style={{ marginLeft: 25 }}>
						<Text style={styles.name}>{userDetails.name}</Text>
						<Text style={styles.phoneNumber}>
							+91 {userDetails.phoneNumber}
						</Text>
					</View>
				</TouchableOpacity>
				<SettingItem name="person-circle-outline" title="Account" />
				<SettingItem name="link-outline" title="Linked devices" />
				<View
					style={{
						borderBottomWidth: StyleSheet.hairlineWidth,
						height: 20,
						marginBottom: 20,
						borderColor: "#393939",
					}}
				/>
				<SettingItem name="sunny" title="Appearance" />
				<SettingItem name="chatbubble" title="Chats" />
				<SettingItem name="notifications" title="Notifications" />
				<SettingItem name="lock-closed" title="Privacy" />
				<View
					style={{
						borderBottomWidth: StyleSheet.hairlineWidth,
						height: 10,
						marginBottom: 20,
						borderColor: "#393939",
					}}
				/>
				<SettingItem name="help-circle" title="Help" />
				<SettingItem name="mail" title="Invite your friends" />
			</SafeAreaView>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
		paddingTop: Platform.OS === "android" ? 25 : 0,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingBottom: 10,
	},
	headerTitle: {
		textTransform: "capitalize",
		color: "#fff",
		fontSize: 20,
		marginLeft: 20,
	},
	profileContainer: {
		flexDirection: "row",
		alignItems: "center",
		margin: 20,
	},
	name: { color: "#fff", textTransform: "capitalize", fontSize: 25 },
	phoneNumber: {
		color: "#fff",

		fontSize: 16,
		fontWeight: "300",
	},
});
