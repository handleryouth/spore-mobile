import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Header } from "../components";
import { Details, Home } from "../screens";

const { Navigator, Screen } = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <>
      <Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTitle: (props) => <Header {...props} showDrawerButton />,
        }}
      >
        <Screen name="Home" component={Home} />
        <Screen
          name="Details"
          component={Details}
          options={{
            headerTitle: (props) => <Header {...props} />,
          }}
        />
      </Navigator>
    </>
  );
};

export default AppNavigator;
