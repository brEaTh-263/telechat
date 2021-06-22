import React, { useRef, useEffect, useState } from "react";
import {
	SafeAreaView,
	Text,
	TouchableOpacity,
	StyleSheet,
	Platform,
	View,
	Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { Avatar } from "react-native-paper";
import { useSelector } from "react-redux";
import RBSheet from "react-native-raw-bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import * as authActions from "../store/actions/Auth";
import { useDispatch } from "react-redux";
import LoadingScreen from "./LoadingScreen";
export default function ProfileScreen({ navigation }) {
	const userDetails = useSelector((state) => state.Auth);
	const refRBSheet = useRef();
	const dispatch = useDispatch();
	const [image, setImage] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const clickImage = async () => {
		if (Platform.OS !== "web") {
			const { status } = await ImagePicker.requestCameraPermissionsAsync();
			if (status !== "granted") {
				alert("Sorry, we need camera roll permissions to make this work!");
				return;
			}
		}
		let result = await ImagePicker.launchCameraAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [2, 2],
			quality: 0.7,
		});

		if (!result.cancelled) {
			onSave(result);
			setImage(result.uri);
		}
	};

	const pickImage = async () => {
		try {
			if (Platform.OS !== "web") {
				const { status } =
					await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== "granted") {
					alert("Sorry, we need camera roll permissions to make this work!");
					return;
				}
			}
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			if (!result.cancelled) {
				onSave(result);
				console.log(result.uri);
				setImage(result.uri);
			}
		} catch (E) {
			console.log(E);
		}
	};

	const onSave = async (image) => {
		setIsLoading(true);
		const manipResult = await ImageManipulator.manipulateAsync(image.uri, [
			{ resize: { width: 720, height: 540 } },
		]);
		const body = new FormData();
		body.append("image", {
			uri: manipResult.uri,
			type: "image/jpg",
			name: "profilePic.jpg",
		});
		try {
			await dispatch(authActions.changeImage(body, userDetails.token));
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
			return Alert.alert("Something went wrong", "Please try again", [
				{ text: "Okay" },
			]);
		}
	};

	if (isLoading) {
		return <LoadingScreen />;
	}
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
			<View style={styles.dpContainer}>
				{userDetails.displayPicture ? (
					<Avatar.Image
						source={{ uri: userDetails.displayPicture }}
						size={100}
					/>
				) : (
					<Avatar.Icon
						icon="account"
						size={100}
						color="#000"
						style={{ backgroundColor: "#fff", zIndex: -10 }}
					/>
				)}
				<TouchableOpacity
					style={styles.cameraIconContainer}
					onPress={() => refRBSheet.current.open()}
				>
					<Ionicons
						name="camera"
						color="#fff"
						size={24}
						style={styles.cameraIcon}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.row}>
				<Ionicons color="#fff" size={28} name="person-sharp" />
				<View style={{ marginLeft: 15 }}>
					<Text style={styles.title}>{userDetails.name}</Text>
					<Text style={styles.subtitle}>Your name</Text>
				</View>
			</View>
			<View style={styles.row}>
				<Ionicons color="#fff" size={28} name="pencil" />
				<View style={{ marginLeft: 15 }}>
					<Text style={styles.title}>About</Text>
					<Text style={styles.subtitle}>Write a few words about yourself</Text>
				</View>
			</View>
			<RBSheet
				ref={refRBSheet}
				closeOnDragDown={true}
				closeOnPressMask={true}
				height={240}
				customStyles={{
					wrapper: {
						backgroundColor: "transparent",
					},
					container: {
						backgroundColor: "#9d9c9c8f",
					},
					draggableIcon: {
						backgroundColor: "transparent",
					},
				}}
			>
				<Text
					style={[
						styles.title,
						{ marginLeft: 15, fontSize: 22, marginBottom: 15 },
					]}
				>
					Choose photo
				</Text>
				<TouchableOpacity
					onPress={() => clickImage()}
					style={[styles.row, { marginVertical: 20 }]}
				>
					<Ionicons name="camera" color="#fff" size={24} />
					<Text style={[styles.title, { marginLeft: 15 }]}>Take photo</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => pickImage()}
					style={[styles.row, { marginVertical: 20 }]}
				>
					<Ionicons name="images-outline" color="#fff" size={24} />
					<Text style={[styles.title, { marginLeft: 15 }]}>
						Choose from gallery
					</Text>
				</TouchableOpacity>
			</RBSheet>
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
	dpContainer: { alignItems: "center", margin: 20, zIndex: 1 },
	cameraIconContainer: {
		position: "absolute",
		bottom: 0,
		left: "55%",
		backgroundColor: "#3c3b3b",
		padding: 7,
		borderRadius: 20,
		zIndex: 100,
		elevation: 50,
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		marginHorizontal: 20,
		marginVertical: 10,
	},
	subtitle: {
		color: "#cecece",
		fontSize: 16,

		fontWeight: "300",
		textTransform: "capitalize",
	},
	title: {
		color: "#fff",
		fontSize: 18,

		fontWeight: "300",
		textTransform: "capitalize",
	},
});
