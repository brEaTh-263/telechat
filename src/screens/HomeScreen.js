import React from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList } from "react-native";
import Colors from "../constants/Colors";
import { Feather } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { users } from "../../raw_data";
import { FAB, Avatar } from "react-native-paper";
import UserItem from "../components/UserItem";

export default function HomeScreen({ navigation }) {
	const userDetails = useSelector((state) => state.Auth);
	console.log(userDetails);
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
			<FlatList
				numColumns={1}
				contentContainerStyle={{ flexDirection: "column", width: "100%" }}
				data={users}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => {
					return (
						<UserItem
							msg={item.msg}
							_id={item._id}
							displayPicture={item.displayPicture}
							name={item.name}
							timestamp={item.timestamp}
						/>
					);
				}}
			/>
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
