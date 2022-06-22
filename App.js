import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text, View, LogBox } from "react-native";
import ProductContainer from "./app/screens/Products/ProductContainer";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./app/Navigators/Main";

import { Provider } from "react-redux";
import store from "./redux/store";
import Header from "./app/components/header";
import Toast from "react-native-toast-message";
LogBox.ignoreAllLogs(true);

import Auth from './Context/store/Auth'
import { getUserProfileByToken } from "./Context/actions/Auth.actions";
import { useEffect } from "react";
export default function App() {



  return (
    <Auth>
    <Provider store={store}>
      <NavigationContainer>
        <NativeBaseProvider>
          <Main />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </NativeBaseProvider>
      </NavigationContainer>
    </Provider>
    </Auth>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
