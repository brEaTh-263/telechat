import React, { useState, useCallback, useEffect } from "react";
import {
	GiftedChat,
	Bubble,
	InputToolbar,
	Send,
} from "react-native-gifted-chat";
import { useSelector } from "react-redux";
import {
	View,
	SafeAreaView,
	Text,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import Colors from "../constants/Colors";
import { Ionicons, Feather } from "@expo/vector-icons";
import { Avatar } from "react-native-paper";

const ChatScreen = ({ route }) => {
	const [messages, setMessages] = useState([]);
	const userDetails = useSelector((state) => state.Auth);
	const { receiverName, receiverId, receiverDisplayPicture } = route.params;
	const onSend = useCallback((messages = []) => {
		console.log(messages);
		setMessages((previousMessages) =>
			GiftedChat.append(previousMessages, messages)
		);
	}, []);

	const renderBubble = (props) => {
		return (
			<Bubble
				{...props}
				textStyle={{
					left: {
						color: "white",
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
	useEffect(() => {
		setMessages([
			{
				_id: 1,
				text: "Hello developer",
				createdAt: new Date(),
				user: {
					_id: 2,
					name: "React Native",
					avatar: "https://placeimg.com/140/140/any",
				},
			},
		]);
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
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
					onPress={() => navigation.navigate("Chat")}
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
				}}
			/>
		</SafeAreaView>
	);
};

export default ChatScreen;
