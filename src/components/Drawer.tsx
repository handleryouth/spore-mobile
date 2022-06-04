import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { AspectRatio, Box, Image, Text, useTheme } from "native-base";

import { RootState } from "../library";

const Drawer = (props: DrawerContentComponentProps) => {
  const reduxState = useSelector((state: RootState) => state);
  const { colors } = useTheme();

  return (
    <DrawerContentScrollView {...props}>
      <Box
        flexDirection="row"
        alignItems="center"
        paddingLeft={3}
        height={200}
        backgroundColor={colors.success[400]}
      >
        <AspectRatio ratio={1 / 1} height={75}>
          <Image
            borderRadius={100}
            src={
              reduxState.user.images.length
                ? reduxState.user.images[0].url
                : "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            }
            alt="User Profile"
          />
        </AspectRatio>

        <Box marginLeft={3}>
          <Text isTruncated fontSize={20} fontWeight="bold">
            {reduxState.user.display_name || "Unknown"}
          </Text>
          <Text fontSize={15}>
            {reduxState.user.followers.total || 0} followers
          </Text>
        </Box>
      </Box>

      <DrawerItem
        label="Home"
        labelStyle={styles.linkText}
        onPress={() => {
          props.navigation.navigate("Main");
        }}
      />

      <DrawerItem
        label="New Released Albums"
        labelStyle={styles.linkText}
        onPress={() => {
          props.navigation.navigate("Main");
        }}
      />
    </DrawerContentScrollView>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  linkText: {
    fontSize: 17,
  },
});
