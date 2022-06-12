import React from "react";
import { useSelector } from "react-redux";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Header } from "../components";
import { RootState } from "../library";
import { Playlist, PlaylistDetail } from "../screens";

const { Navigator, Screen } = createNativeStackNavigator();

const PlaylistNavigator = () => {
  const reduxState = useSelector((state: RootState) => state);
  return (
    <>
      <Navigator
        initialRouteName="Your Playlist"
        screenOptions={{
          headerTitle: (props) => <Header {...props} showDrawerButton />,
        }}
      >
        <Screen
          name={`${reduxState.user.display_name || "Unknown"} Playlist`}
          component={Playlist}
        />
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
