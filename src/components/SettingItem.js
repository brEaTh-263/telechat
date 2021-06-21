import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export default function SettingItem({ name, title }) {
	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				marginHorizontal: 20,
				marginVertical: 10,
			}}
		>
			<Ionicons color="#fff" size={28} name={name} />
			<Text
				style={{
					color: "#fff",
					fontSize: 18,
					marginLeft: 15,
					fontWeight: "300",
				}}
			>
				{title}
			</Text>
		</View>
	);
}
