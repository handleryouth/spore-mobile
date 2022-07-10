import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import { NativeBaseProvider } from "native-base";

import "react-native-gesture-handler";

import { theme } from "./src/utils/theme";
import { AppRoutes, fontsProperties, store } from "./src";

LogBox.ignoreLogs(["EventEmitter.addListener"]);

const fetchFonts = async () => {
  await Font.loadAsync(fontsProperties);
};

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetchFonts()
      .then(() => setLoaded(true))
      .catch(() => setLoaded(false));
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <AppRoutes />
      </NativeBaseProvider>
    </Provider>
  );
}
