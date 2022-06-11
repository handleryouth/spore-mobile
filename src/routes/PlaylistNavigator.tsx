import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Header } from "../components";
import { Playlist, PlaylistDetail } from "../screens";

const { Navigator, Screen } = createNativeStackNavigator();

const PlaylistNavigator = () => {
  return (
    <>
      <Navigator
        initialRouteName="Your Playlist"
        screenOptions={{
          headerTitle: (props) => <Header {...props} showDrawerButton />,
        }}
      >
        <Screen name="Your Playlist" component={Playlist} />
        <Screen
          name="Playlist Detail"
          component={PlaylistDetail}
          options={{
            headerTitle: (props) => <Header {...props} />,
          }}
        />
      </Navigator>
    </>
  );
};

export default PlaylistNavigator;
