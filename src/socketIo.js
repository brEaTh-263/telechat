import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
import { url } from "./constants/url";
const socket = io(`${url}`, { autoConnect: false });
const x = async () => {
	console.log("x called");
	const _id = await AsyncStorage.getItem("_id");
	console.log(_id);
	socket.auth = { _id };
	socket.connect();
};

x();

socket.onAny((event, ...args) => {
	console.log(event, args);
});

export default socket;
