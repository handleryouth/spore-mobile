import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Flex, Text } from "native-base";

interface HeaderProps {
  children: string;
  tintColor?: string;
  showDrawerButton?: boolean;
}

const Header = ({ children, showDrawerButton }: HeaderProps) => {
  const navigation = useNavigation();
  return (
    <Flex direction="row" alignItems="center">
      {showDrawerButton && (
        <Ionicons
          style={{
            marginRight: 8,
          }}
          name="reorder-three"
          size={40}
          color="black"
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        />
      )}
      <Text fontSize={20} fontWeight="semibold">
        {children}
      </Text>
    </Flex>
  );
};

export default Header;
