import React, { useState } from "react";
import {
	View,
	SafeAreaView,
	Text,
	StyleSheet,
	Image,
	TouchableOpacity,
	Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Colors from "../constants/Colors";
import { Button } from "react-native-paper";
import CountDown from "react-native-countdown-component";
import * as authActions from "../store/actions/Auth";
import { useDispatch } from "react-redux";
import LoadingScreen from "./LoadingScreen";

export default function OtpScreen({ navigation, route }) {
	// const { phoneNumber, name } = route.params;
	const phoneNumber = "";
	const name = "";
	const [canSendOtp, setCanSendOtp] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [code, setCode] = useState("");
	const dispatch = useDispatch();
	const resendOtp = async () => {
		setCanSendOtp(false);
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
	const verificationHandler = async () => {
		try {
			setIsLoading(true);
			await dispatch(
				authActions.authenticatePhoneNumber(name, code, phoneNumber)
			);
			setIsLoading(false);
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
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				style={styles.backbutton}
			>
				<Ionicons name="arrow-back" size={24} color={Colors.primary} />
			</TouchableOpacity>
			<Image
				style={styles.imageStyle}
				resizeMode="contain"
				source={require("../../assets/otp_page.png")}
			/>
			<Text style={styles.title}>Verification Code</Text>
			<Text style={styles.subtitle}>
				Enter the verification code sent to the number{" "}
				<Text>(+91){phoneNumber}</Text>
			</Text>

			<OTPInputView
				style={{ width: "60%", height: "15%" }}
				pinCount={4}
				code={code}
				onCodeChanged={(code) => setCode(code)}
				autoFocusOnLoad
				codeInputFieldStyle={styles.underlineStyleBase}
				codeInputHighlightStyle={styles.underlineStyleHighLighted}
				onCodeFilled={(code) => {
					console.log(`Code is ${code}, you are good to go!`);
				}}
			/>
			<View style={{ height: "10%" }} />
			<Button
				mode="contained"
				uppercase={false}
				style={{ borderRadius: 15, width: "70%" }}
				contentStyle={{ padding: 10 }}
				labelStyle={{ fontSize: 20 }}
				onPress={() => verificationHandler()}
			>
				Submit
			</Button>
			{canSendOtp && (
				<TouchableOpacity onPress={resendOtp}>
					<Text style={styles.resendOtpButton}>Resend OTP</Text>
				</TouchableOpacity>
			)}
			{!canSendOtp && (
				<View style={{ flexDirection: "row", justifyContent: "center" }}>
					<Text style={styles.resendOtpTime}>Resend OTP in {"  "}</Text>

					<CountDown
						until={30}
						size={18}
						onFinish={() => setCanSendOtp(true)}
						style={{ width: 30 }}
						digitStyle={{ backgroundColor: "transparent", margin: 0 }}
						digitTxtStyle={{ color: Colors.primary }}
						timeToShow={["S"]}
						timeLabels={{ s: "SS" }}
					/>
					<Text style={styles.resendOtpTime}>seconds</Text>
				</View>
			)}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
		alignItems: "center",
		paddingTop: Platform.OS === "android" ? 25 : 0,
	},
	borderStyleBase: {
		width: 30,
		height: 45,
	},

	borderStyleHighLighted: {
		borderColor: "#03DAC6",
	},
	backbutton: {
		backgroundColor: "#000",
		borderRadius: 50,
		padding: 10,
		alignSelf: "flex-start",
		marginLeft: 10,
	},
	imageStyle: {
		width: 150,
		height: "20%",
		marginVertical: 15,
	},
	title: {
		color: "#fff",
		fontSize: 30,
		fontWeight: "bold",
		marginVertical: 15,
		letterSpacing: 1,
	},
	subtitle: {
		color: "#fff",
		width: "60%",
		textAlign: "center",
		fontSize: 18,
		letterSpacing: 1,
		fontWeight: "200",
	},
	resendOtpButton: {
		marginTop: 12,
		color: "#fff",

		textAlign: "center",
		fontSize: 18,
		letterSpacing: 1,
	},
	resendOtpTime: {
		marginTop: 12,
		color: "#fff",

		textAlign: "center",
		fontSize: 18,
		letterSpacing: 1,
	},
	underlineStyleBase: {
		width: 45,
		height: 45,
		borderWidth: 0,
		fontSize: 24,
		borderBottomWidth: 1,
		padding: 10,
	},

	underlineStyleHighLighted: {
		borderColor: Colors.primary,
	},
});
