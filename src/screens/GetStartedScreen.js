import React from "react";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import {
	SafeAreaView,
	StyleSheet,
	Image,
	Text,
	TouchableOpacity,
} from "react-native";

export default function SignInScreen({ navigation }) {
	return (
		<SafeAreaView style={styles.container}>
			<Image
				style={styles.image}
				resizeMode="cover"
				source={require("../../assets/hand-wave.png")}
			/>
			<Text style={styles.title}>Let's Have Chat Together</Text>
			<Text style={styles.description}>
				Mobile Messaging is rapidly becoming the primary way users socially
				engage on mobile
			</Text>
			<TouchableOpacity
				onPress={() => navigation.navigate("SignIn")}
				style={styles.buttonBackground}
			>
				<Ionicons
					style={{ alignSelf: "center" }}
					name="arrow-forward"
					size={30}
					color="#fff"
				/>
			</TouchableOpacity>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
		overflow: "hidden",
		alignItems: "center",
	},
	image: {
		width: "70%",
		height: "50%",
		alignSelf: "center",
		marginTop: 45,
	},
	title: {
		color: "#fff",
		fontSize: 30,
		width: 200,
		marginHorizontal: 40,
		marginVertical: 30,
		fontWeight: "700",
		textAlign: "center",
	},
	description: {
		color: "#fff",
		fontSize: 15,
		textAlign: "center",
		width: "65%",
	},
	buttonBackground: {
		width: 80,
		height: 80,
		backgroundColor: "#ef6168",
		borderRadius: 80 / 2,
		justifyContent: "center",
		marginTop: 50,
	},
});
