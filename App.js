import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import AuthReducer from "./src/store/reducers/Auth";
import AppNavigator from "./src/navigator/AppNavigator";
import Colors from "./src/constants/Colors";

const rootReducer = combineReducers({
	Auth: AuthReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: Colors.primary,
		accent: Colors.accent,
		background: Colors.background,
		text: "#fff",
	},
};
const App = () => {
	return (
		<Provider store={store}>
			<PaperProvider theme={theme}>
				<AppNavigator />
			</PaperProvider>
		</Provider>
	);
};

export default App;
