import React, { useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList } from "react-native";
import Colors from "../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { FAB, Avatar } from "react-native-paper";
import UserItem from "../components/UserItem";
import socket from "../socketIo";
import * as chatActions from "../store/actions/Chats";

export default function HomeScreen({ navigation }) {
	const userDetails = useSelector((state) => state.Auth);
	const rooms = useSelector((state) => state.Chats.rooms);
	console.log(rooms);
	const dispatch = useDispatch();
	useEffect(() => {
		socket.auth = { _id: userDetails._id };
		socket.connect();
	}, []);

	useEffect(() => {
		socket.emit("get_my_chats", { _id: userDetails._id });
	}, []);

	useEffect(() => {
		socket.on("your_rooms", (rooms) => {
			console.log("GOT MY ROOMSS");
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
						if (item.messages.length > 0)
							return (
								<UserItem
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
