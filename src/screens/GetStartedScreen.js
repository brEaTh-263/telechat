import React from "react";
import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import {
	SafeAreaView,
	StyleSheet,
	Platform,
	Image,
	Text,
	TouchableOpacity,
} from "react-native";

export default function SignInScreen({ navigation }) {
	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>Telechat</Text>
			<Image
				style={styles.image}
				resizeMode="contain"
				source={require("../../assets/get_started.png")}
			/>
			<Text style={styles.description}>
				A world without communication is meaningless. So, you have to message
				everyone now.
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
		paddingTop: Platform.OS === "android" ? 25 : 0,
	},
	image: {
		width: "90%",
		height: "45%",
		alignSelf: "center",
		marginTop: 30,
	},
	title: {
		color: "#fff",
		fontSize: 50,
		width: 200,
		marginHorizontal: 40,
		fontFamily: "logo",
		marginTop: 30,
		textAlign: "center",
	},
	description: {
		color: "#fff",
		fontSize: 15,
		textAlign: "center",
		width: "68%",
		letterSpacing: 1,
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
