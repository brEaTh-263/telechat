import React, { useState } from "react";
import { SafeAreaView, Text, FlatList, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import useSeachUsers from "../hooks/useSeachUsers";
import { Searchbar } from "react-native-paper";
import UserItem from "../components/UserItem";
import { Ionicons } from "@expo/vector-icons";
export default function SearchUserScreen({ navigation }) {
	// const [searchQuery, setSearchQuery] = useState("");
	const [getUsers, users, setUsers] = useSeachUsers();
	console.log(users);
	const onChangeSearch = (query) => {
		getUsers(query);
	};
	return (
		<SafeAreaView style={{ backgroundColor: Colors.background, flex: 1 }}>
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={{
					backgroundColor: "#000",
					borderRadius: 50,
					padding: 10,
					alignSelf: "flex-start",
					marginLeft: 10,
				}}
			>
				<Ionicons name="arrow-back" size={24} color={Colors.accent} />
			</TouchableOpacity>
			<Searchbar
				icon="magnify"
				iconColor={Colors.accent}
				style={{
					margin: 20,
					backgroundColor: "rgba(256,256,256,0.2)",
					borderRadius: 20,
				}}
				placeholder="Search using username"
				placeholderTextColor={Colors.accent}
				onChangeText={onChangeSearch}
			/>
			<FlatList
				numColumns={1}
				contentContainerStyle={{ flexDirection: "column", width: "100%" }}
				data={users}
				keyExtractor={(item) => item._id}
				renderItem={({ item }) => {
					return (
						<UserItem
							_id={item._id}
							displayPicture={item.displayPicture}
							name={item.name}
						/>
					);
				}}
			/>
		</SafeAreaView>
	);
}
