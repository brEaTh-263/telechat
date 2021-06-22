import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
import { url } from "./constants/url";
const socket = io(`${url}`, { autoConnect: false });
const connectMe = async () => {
	const _id = await AsyncStorage.getItem("_id");
	socket.auth = { _id };
	if (!_id) return;
	socket.connect();
};

connectMe();

socket.onAny((event, ...args) => {
	// console.log(event, args);
});

export default socket;
