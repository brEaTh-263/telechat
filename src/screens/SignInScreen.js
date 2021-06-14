import React, { useState } from "react";
import { View, SafeAreaView, Text, StyleSheet, Image } from "react-native";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/Auth";
import { useDispatch } from "react-redux";
import { TextInput, Button } from "react-native-paper";
import Toast, { BaseToast } from "react-native-toast-message";
import LoadingScreen from "./LoadingScreen";
export default function SignInScreen({ navigation }) {
	const [name, setName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const toastConfig = {
		error: ({ text1, props, ...rest }) => {
			return (
				<View
					style={{
						padding: 15,
						width: "70%",
						backgroundColor: "#f3f5f7",
						alignItems: "center",
						justifyContent: "center",
						borderRadius: 20,
					}}
				>
					<Text>{text1}</Text>
				</View>
			);
		},
	};

	const onSendOtpHandler = async () => {
		if (name.length === 0) {
			Toast.show({
				type: "error",
				text1: "Enter a username to continue",
				position: "bottom",
				bottomOffset: 80,
			});
			return;
		}
		if (phoneNumber.length != 10) {
			Toast.show({
				type: "error",
				text1: "Must be 10-digit number",
				position: "bottom",
				bottomOffset: 80,
			});
			return;
		}
		try {
			setIsLoading(true);
			await dispatch(authActions.signIn(phoneNumber));
			setIsLoading(false);
			navigation.navigate("Otp", { phoneNumber: phoneNumber, name: name });
		} catch (error) {
			console.log(error);
			setIsLoading(false);
			alert("Something went wrong");
		}
	};

	if (isLoading) {
		return <LoadingScreen />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<View style={{ height: "10%" }} />

			<Image
				source={require("../../assets/conversation.png")}
				resizeMode="contain"
				style={{ marginTop: 30, height: "13%", width: "60%" }}
			/>
			<Text
				style={{
					color: "#fff",
					marginVertical: 15,
					fontSize: 30,
					fontWeight: "bold",
				}}
			>
				Welcome!
			</Text>
			<Text
				style={{
					color: "#888",
					marginVertical: 5,
					fontSize: 18,
					fontWeight: "bold",
				}}
			>
				Enter the details to continue..
			</Text>
			<View style={{ width: "100%", alignItems: "center", marginVertical: 20 }}>
				<TextInput
					style={styles.inputStyle}
					label="Name"
					keyboardType="ascii-capable"
					value={name}
					autoCapitalize="words"
					autoCompleteType="username"
					autoCorrect={false}
					maxLength={25}
					textContentType="username"
					underlineColor="#888"
					theme={{
						colors: {
							primary: "#888",
							background: "transparent",
							placeholder: "#888",
						},
					}}
					placeholderTextColor="#fff"
					onChangeText={(text) => setName(text)}
				/>
				<TextInput
					style={styles.inputStyle}
					label="Phone Number"
					autoCompleteType="tel"
					textContentType="telephoneNumber"
					keyboardType="number-pad"
					maxLength={10}
					value={phoneNumber}
					underlineColor="#888"
					theme={{
						colors: {
							primary: "#888",
							background: "transparent",
							placeholder: "#888",
						},
					}}
					placeholderTextColor="#fff"
					onChangeText={(text) => setPhoneNumber(text)}
				/>
			</View>
			<View style={{ height: "10%" }} />
			<Button
				mode="contained"
				uppercase={false}
				style={{ borderRadius: 15, width: "70%" }}
				contentStyle={{ padding: 10 }}
				labelStyle={{ fontSize: 20 }}
				onPress={() => onSendOtpHandler()}
			>
				Send Otp
			</Button>
			<Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: Colors.background,
	},
	inputStyle: { width: "80%", marginVertical: 10 },
});
