import React, { useEffect, useRef } from "react";
import {
	SafeAreaView,
	View,
	Text,
	StyleSheet,
	FlatList,
	Platform,
} from "react-native";
import Colors from "../constants/Colors";
import * as Notifications from "expo-notifications";
import { Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { FAB, Avatar } from "react-native-paper";
import UserItem from "../components/UserItem";
import socket from "../socketIo";
import Constants from "expo-constants";
import * as chatActions from "../store/actions/Chats";
import * as authActions from "../store/actions/Auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Notifications.setNotificationHandler({
// 	handleNotification: async () => ({
// 		shouldShowAlert: true,
// 		shouldPlaySound: false,
// 		shouldSetBadge: false,
// 	}),
// });

export default function HomeScreen({ navigation }) {
	const userDetails = useSelector((state) => state.Auth);
	const rooms = useSelector((state) => state.Chats.rooms);
	// console.log(rooms);
	const dispatch = useDispatch();
	const responseListener = useRef();
	const notificationListener = useRef();

	useEffect(() => {
		const getPushToken = async () => {
			const tokenStatus = await AsyncStorage.getItem("pushToken");
			if (tokenStatus !== "granted")
				if (Constants.isDevice)
					registerForPushNotificationsAsync().then((token) => {
						AsyncStorage.setItem("pushToken", "granted");
						dispatch(authActions.sendPushToken(token, userDetails.token));
					});
		};
		getPushToken();
	}, []);

	useEffect(() => {
		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) => {
				// console.log(notification);
				dispatch(
					chatActions.pushMessage(
						notification.request.content.data.roomId,
						notification.request.content.data.content
					)
				);
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener((response) => {
				dispatch(
					chatActions.pushMessage(
						response.request.content.data.roomId,
						response.request.content.data.content
					)
				);
			});

		return () => {
			Notifications.removeNotificationSubscription(
				notificationListener.current
			);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);

	useEffect(() => {
		console.log("EMIT_MY_CHATS CALLED");
		socket.emit("get_my_chats", { _id: userDetails._id });
	}, []);

	useEffect(() => {
		console.log("Your room called");
		socket.on("your_rooms", (rooms) => {
			dispatch(chatActions.getAllRooms(rooms));
		});
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<Avatar.Text
						size={40}
						label={userDetails.name[0]}
						labelStyle={{ textTransform: "capitalize" }}
					/>
					<Text
						style={{
							color: "#fff",
							fontSize: 35,
							fontWeight: "bold",
							marginLeft: 10,
						}}
					>
						Chats
					</Text>
				</View>
				<Feather name="search" size={24} color={Colors.primary} />
			</View>
			<FAB
				style={styles.fab}
				icon="chat-plus-outline"
				onPress={() => navigation.navigate("SearchUsers")}
			/>
			{rooms.length > 0 && (
				<FlatList
					numColumns={1}
					contentContainerStyle={{ flexDirection: "column", width: "100%" }}
					data={rooms}
					keyExtractor={(item) => item._id}
					renderItem={({ item }) => {
						let receiver;
						if (userDetails._id === item.userIds[0]._id) {
							receiver = item.userIds[1];
						} else {
							receiver = item.userIds[0];
						}
						let count = item?.count;

						if (item.messages.length > 0)
							return (
								<UserItem
									count={count}
									msg={item.messages[item.messages.length - 1].text}
									_id={item._id}
									displayPicture={item.displayPicture}
									name={receiver.name}
									receiverId={receiver._id.toString()}
									timestamp={item.messages[item.messages.length - 1].createdAt}
								/>
							);
					}}
				/>
			)}
		</SafeAreaView>
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
		justifyContent: "space-between",
		marginHorizontal: 25,
		marginVertical: 15,
		alignItems: "center",
	},
	fab: {
		backgroundColor: Colors.primary,
		position: "absolute",
		margin: 16,
		right: 15,
		bottom: 20,
		zIndex: 100,
	},
});

async function registerForPushNotificationsAsync() {
	let token;
	if (Constants.isDevice) {
		const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== "granted") {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== "granted") {
			AsyncStorage.setItem("pushToken", "revoked");
			alert("Allow notifications to receive messages");
			return;
		}
		token = (await Notifications.getExpoPushTokenAsync()).data;
		console.log(token);
	} else {
		alert("Must use physical device for Push Notifications");
	}

	if (Platform.OS === "android") {
		Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
		});
	}

	return token;
}
