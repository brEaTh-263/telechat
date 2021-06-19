import React, { useState, useCallback, useEffect } from "react";
import {
	GiftedChat,
	Bubble,
	InputToolbar,
	Send,
} from "react-native-gifted-chat";
import { useSelector, useDispatch } from "react-redux";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
	View,
	SafeAreaView,
	Text,
	StyleSheet,
	TouchableOpacity,
	Platform,
} from "react-native";
import * as chatActions from "../store/actions/Chats";
import Colors from "../constants/Colors";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";
import socket from "../socketIo";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChatScreen = ({ route, navigation }) => {
	const [messages, setMessages] = useState([]);
	const userDetails = useSelector((state) => state.Auth);
	const roomDetails = useSelector((state) => state.Chats.rooms);
	const dispatch = useDispatch();
	const navigator = useNavigation();
	const { receiverName, receiverId, receiverDisplayPicture, roomId } =
		route.params;
	const onSend = useCallback((messages = []) => {
		console.log("Pushing some message");
		socket.emit("private message", {
			content: messages[messages.length - 1],
			to: receiverId,
		});
		dispatch(
			chatActions.pushMessage(socket.auth.roomId, messages[messages.length - 1])
		);
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, messages)
		);
	}, []);

	useEffect(() => {
		console.log("trying to connect to room");
		socket.auth = { _id: userDetails._id, receiverId: receiverId };
		socket.emit("connect_me_to_room", {
			_id: userDetails._id,
			receiverId: receiverId,
		});
	}, []);

	useEffect(() => {
		if (roomId) {
			roomDetails.map((room) => {
				if (room._id === roomId) {
					let reversedMessages = room.messages.reverse();
					setMessages((previousMessages) =>
						GiftedChat.append(previousMessages, reversedMessages)
					);
				}
			});
			dispatch(chatActions.resetNewMessages(roomId));
		}
	}, [roomId]);
	useEffect(() => {
		console.log("Getting room info");
		socket.on("room", async ({ roomId, existingRoom }) => {
			if (!roomId) {
				dispatch(chatActions.getRoomDetails(existingRoom));
				console.log("dispatched");
			}
			socket.auth = { roomId };
			AsyncStorage.getItem("rooms", (err, result) => {
				const allRooms = JSON.parse(result);
				const exists = allRooms.filter((room) => room._id === roomId);
				if (!exists) {
					console.log("Pushing room details into Async Storage");
					allRooms.push({ _id: roomId, receiverName, receiverId });
					AsyncStorage.setItem("rooms", JSON.stringify(allRooms));
				}
			});
		});
		return () => {
			socket.off("room");
		};
	}, []);
	useEffect(() => {
		console.log("Getting some message");

		socket.off("private message").on("private message", ({ content, from }) => {
			console.log(`I am ${userDetails.name}`);
			// console.log(socket.auth.roomId);
			dispatch(chatActions.pushMessage(socket.auth.roomId, content));

			if (!navigator.isFocused()) {
				console.log("NOT FOCUSED");
				console.log(content);
				dispatch(chatActions.showNewMessages(socket.auth.roomId, content));
			} else {
				setMessages((previousMessages) =>
					GiftedChat.append(previousMessages, [content])
				);
			}
		});
	}, []);

	useEffect(() => {
		socket.on("connect_error", (err) => {
			console.log(err);
		});
		return () => {
			socket.off("connect_error");
		};
	}, []);

	const renderBubble = (props) => {
		return (
			<Bubble
				{...props}
				textStyle={{
					left: {
						color: "#000",
						fontWeight: "500",
						paddingLeft: 8,
						paddingRight: 8,
						paddingTop: 8,
						fontSize: 18,
					},
					right: {
						color: "white",
						fontWeight: "500",
						paddingLeft: 8,
						paddingRight: 8,
						paddingTop: 8,
						fontSize: 18,
					},
				}}
				wrapperStyle={{
					right: {
						backgroundColor: "#3A13C3",
					},
				}}
			/>
		);
	};
	const renderInputToolbar = (props) => {
		return (
			<InputToolbar
				{...props}
				containerStyle={{
					backgroundColor: "transparent",
					borderTopColor: "#888",
					borderTopWidth: StyleSheet.hairlineWidth,
					// padding: 8,
				}}
			/>
		);
	};
	const renderSend = (props) => {
		return (
			<Send {...props}>
				<View style={{ marginRight: 10, marginBottom: 5 }}>
					<Feather name="send" size={24} color={Colors.primary} />
				</View>
			</Send>
		);
	};

	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: Colors.background,
				paddingTop: Platform.OS === "android" ? 25 : 0,
			}}
		>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					paddingHorizontal: 20,
					paddingBottom: 10,
					borderColor: "#888",
					borderBottomWidth: StyleSheet.hairlineWidth,
				}}
			>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("Home");
					}}
					style={{
						padding: 5,
						marginRight: 10,
					}}
				>
					<Ionicons name="arrow-back" size={24} color={Colors.primary} />
				</TouchableOpacity>
				<Avatar.Image size={48} source={require("../../assets/otp.png")} />
				<Text
					style={{
						textTransform: "capitalize",
						color: "#fff",
						fontSize: 20,
						marginLeft: 20,
					}}
				>
					{receiverName}
				</Text>
			</View>
			<GiftedChat
				renderBubble={renderBubble}
				messages={messages}
				textInputStyle={{ color: "#fff" }}
				renderInputToolbar={renderInputToolbar}
				renderSend={renderSend}
				onSend={(messages) => onSend(messages)}
				user={{
					_id: userDetails._id,
					name: userDetails.name,
				}}
			/>
		</SafeAreaView>
	);
};

export default ChatScreen;
