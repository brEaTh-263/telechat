import AsyncStorage from "@react-native-async-storage/async-storage";
import io from "socket.io-client";
const socket = io("http://localhost:3000", { autoConnect: false });

const x = async () => {
	const _id = await AsyncStorage.getItem("_id");
	socket.auth = { _id };
	socket.connect();
};

x();

socket.onAny((event, ...args) => {
	// console.log(event, args);
});

export default socket;
