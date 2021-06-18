import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { Badge } from "react-native-paper";
import Colors from "../constants/Colors";
export default function UserItem({
	_id,
	timestamp,
	name,
	displayPicture,
	msg,
	receiverId,
	count,
}) {
	const getDateFormat = () => {
		const d = moment(timestamp, "YYYYMMDD").fromNow();
		return d;
	};
	const navigate = useNavigation();
	return (
		<TouchableOpacity
			onPress={() =>
				navigate.navigate("Chat", {
					receiverId: receiverId,
					receiverName: name,
					roomId: _id,
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
				{msg && (
					<Text
						style={{ color: "#fff", width: "70%" }}
						ellipsizeMode="tail"
						numberOfLines={1}
					>
						{msg}
					</Text>
				)}
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
			{count > 0 && (
				<Badge
					size={25}
					style={{
						opacity: 1,
						position: "absolute",
						right: 20,
						top: 60,
						backgroundColor: Colors.primary,
						color: "#fff",
					}}
				>
					{count}
				</Badge>
			)}
		</TouchableOpacity>
	);
}
