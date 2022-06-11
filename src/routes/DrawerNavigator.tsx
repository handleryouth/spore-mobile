import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { Drawer } from "../components";
import { CreatePlaylist, NewAlbum } from "../screens";

import AppNavigator from "./AppNavigator";
import PlaylistNavigator from "./PlaylistNavigator";

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
      <Screen name="Create Playlist" component={CreatePlaylist} />
      <Screen
        name="Your Playlist"
        component={PlaylistNavigator}
        options={{
          headerShown: false,
        }}
      />
    </Navigator>
  );
}

export default DrawerNavigator;
