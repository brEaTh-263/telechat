import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	TouchableWithoutFeedback,
} from "react-native";
import moment from "moment";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Badge, Avatar } from "react-native-paper";
import Colors from "../constants/Colors";
import RBSheet from "react-native-raw-bottom-sheet";
import { TouchableRipple } from "react-native-paper";
import SettingItem from "./SettingItem";
const MAX_WIDTH = Dimensions.get("window").width;
export default function UserItem({
	_id,
	timestamp,
	name,
	displayPicture,
	msg,
	receiverId,
	count,
	phoneNumber,
}) {
	const [seed, setSeed] = useState("");
	const getDateFormat = () => {
		const x = new Date(timestamp);

		const d = moment(x, "YYYYMMDD").fromNow();
		return d;
	};
	const navigate = useNavigation();
	const refRBSheet = useRef();
	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, []);
	return (
		<TouchableRipple
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
			<>
				<TouchableWithoutFeedback onPress={() => refRBSheet.current.open()}>
					<Avatar.Image
						size={60}
						style={{ marginRight: 10 }}
						source={{
							uri: displayPicture
								? displayPicture
								: `https://i.pravatar.cc/${seed}`,
						}}
					/>
				</TouchableWithoutFeedback>
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
							style={{ color: "#fff", width: MAX_WIDTH - 150 }}
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
				<RBSheet
					ref={refRBSheet}
					closeOnDragDown={true}
					closeOnPressMask={true}
					height={350}
					customStyles={{
						wrapper: {
							backgroundColor: "transparent",
						},
						container: {
							backgroundColor: "#353535",
						},
						draggableIcon: {
							backgroundColor: "transparent",
						},
					}}
				>
					<View style={{ alignItems: "center" }}>
						<Avatar.Image
							size={100}
							style={{ marginRight: 10 }}
							source={{
								uri: displayPicture
									? displayPicture
									: `https://i.pravatar.cc/${seed}`,
							}}
						/>
						<Text
							style={{
								color: "#fff",
								fontSize: 20,
								fontWeight: "400",
								marginBottom: 5,
								textTransform: "capitalize",
							}}
						>
							{name}
						</Text>
						<Text style={{ color: "#fff" }}>(+91) {phoneNumber}</Text>

						<View
							style={{
								flexDirection: "row",
								justifyContent: "space-around",
								width: "70%",
								marginVertical: 10,
							}}
						>
							<Ionicons
								name="chatbubble"
								style={styles.iconStyle}
								size={24}
								color={Colors.primary}
							/>
							<Ionicons
								name="videocam"
								style={styles.iconStyle}
								size={24}
								color={Colors.primary}
							/>
							<Ionicons
								name="call"
								style={styles.iconStyle}
								size={24}
								color={Colors.primary}
							/>
						</View>
						<View style={{ alignSelf: "flex-start" }}>
							<SettingItem name="close-circle" title="Block" />
							<SettingItem name="people" title="Chats" />
						</View>
					</View>
				</RBSheet>
			</>
		</TouchableRipple>
	);
}

const styles = StyleSheet.create({
	iconStyle: {
		backgroundColor: "#323131",
		padding: 8,
		overflow: "hidden",
		borderRadius: 20,
	},
});
