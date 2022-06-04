import React from "react";
import { AppRegistry, LogBox } from "react-native";
import { Provider } from "react-redux";
import { NativeBaseProvider } from "native-base";

import "react-native-gesture-handler";

import { AppRoutes, store } from "./src";

LogBox.ignoreLogs(["EventEmitter.addListener"]);

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <AppRoutes />
      </NativeBaseProvider>
    </Provider>
  );
}

AppRegistry.registerComponent("main", () => App);
