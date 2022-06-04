import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Login } from "../screens";

const { Navigator, Screen } = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Navigator initialRouteName="Login">
      <Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
};

export default AuthNavigator;
