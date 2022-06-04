import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Drawer } from "../components";

import AppNavigator from "./AppNavigator";

const { Navigator, Screen } = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Navigator drawerContent={(props) => <Drawer {...props} />}>
      <Screen
        name="Main"
        component={AppNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
}

export default DrawerNavigator;
