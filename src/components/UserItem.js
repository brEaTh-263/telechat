import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
export default function UserItem({
	_id,
	timestamp,
	name,
	displayPicture,
	msg,
}) {
	console.log(timestamp);
	const getDateFormat = () => {
		const d = moment(timestamp, "YYYYMMDD").fromNow();
		return d;
	};
	const navigate = useNavigation();
	return (
		<TouchableOpacity
			onPress={() =>
				navigate.navigate("Chat", {
					receiverId: _id,
					receiverName: name,
					receiverDisplayPicture: displayPicture,
				})
			}
			style={{
				flexDirection: "row",
				borderBottomWidth: StyleSheet.hairlineWidth,
				borderColor: "#888",
				padding: 25,
				alignItems: "center",
			}}
		>
			<Image
				style={{
					width: 50,
					height: 50,
					borderRadius: 15,
					overflow: "hidden",
					backgroundColor: "#888",
					marginRight: 20,
				}}
				resizeMode="contain"
				source={require("../../assets/otp.png")}
			/>
			<View>
				<Text
					style={{
						color: "#fff",
						fontSize: 20,
						fontWeight: "bold",
						marginBottom: 5,
						textTransform: "capitalize",
					}}
				>
					{name}
				</Text>
				{msg && <Text style={{ color: "#fff" }}>{msg}</Text>}
			</View>
			{timestamp && (
				<Text
					style={{
						color: "#fff",
						opacity: 0.8,
						position: "absolute",
						right: 10,
						top: 30,
					}}
				>
					{getDateFormat()}
				</Text>
			)}
		</TouchableOpacity>
	);
}
