import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import Colors from "../constants/Colors";

export default function LoadingScreen() {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: Colors.background,
			}}
		>
			<LottieView
				source={require("../../assets/loadingAnimation.json")}
				autoPlay
				loop
			/>
		</View>
	);
}
