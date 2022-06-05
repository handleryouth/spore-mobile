import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Drawer } from "../components";
import { NewAlbum } from "../screens";

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
      <Screen name="New Album" component={NewAlbum} />
    </Navigator>
  );
}

export default DrawerNavigator;
