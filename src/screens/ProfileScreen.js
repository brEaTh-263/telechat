import React from "react";
import {
	SafeAreaView,
	Text,
	TouchableOpacity,
	StyleSheet,
	Platform,
	View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
export default function ProfileScreen({ navigation }) {
	const userDetails = useSelector((state) => state.Auth);
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					onPress={() => {
						navigation.goBack();
					}}
					style={{
						paddingRight: 5,
					}}
				>
					<Ionicons name="arrow-back" size={24} color={Colors.primary} />
				</TouchableOpacity>
				<Text style={styles.headerTitle}>Profile</Text>
			</View>
			<View style={{ alignItems: "center", margin: 20 }}>
				<Avatar.Icon
					icon="account"
					size={100}
					color="#000"
					style={{ backgroundColor: "#fff" }}
				/>
				<TouchableOpacity>
					<Ionicons
						name="camera"
						color="#fff"
						size={24}
						style={{
							position: "relative",
							bottom: 30,
							left: 30,
							backgroundColor: "#3c3b3b",
							padding: 7,
							borderRadius: 20,
							overflow: "hidden",
						}}
					/>
				</TouchableOpacity>
			</View>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					marginHorizontal: 20,
					marginVertical: 10,
				}}
			>
				<Ionicons color="#fff" size={28} name="person-sharp" />
				<View style={{ marginLeft: 15 }}>
					<Text
						style={{
							color: "#fff",
							fontSize: 18,

							fontWeight: "300",
							textTransform: "capitalize",
						}}
					>
						{userDetails.name}
					</Text>
					<Text
						style={{
							color: "#cecece",
							fontSize: 16,

							fontWeight: "300",
							textTransform: "capitalize",
						}}
					>
						Your name
					</Text>
				</View>
			</View>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					marginHorizontal: 20,
					marginVertical: 20,
				}}
			>
				<Ionicons color="#fff" size={28} name="pencil" />
				<View style={{ marginLeft: 15 }}>
					<Text
						style={{
							color: "#fff",
							fontSize: 18,

							fontWeight: "300",
							textTransform: "capitalize",
						}}
					>
						About
					</Text>
					<Text
						style={{
							color: "#bfbfbf",
							fontSize: 16,

							fontWeight: "300",
							textTransform: "capitalize",
						}}
					>
						Write a few words about yourself
					</Text>
				</View>
			</View>
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
});
