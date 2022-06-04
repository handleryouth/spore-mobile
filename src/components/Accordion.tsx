import React, { ReactNode, useState } from "react";
import Collapsible from "react-native-collapsible";
import { Feather } from "@expo/vector-icons";
import { Pressable, Text, useTheme, View } from "native-base";

interface AccordionProps {
  title: string;
  children: ReactNode;
}

const Accordion = ({ title, children }: AccordionProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const { colors } = useTheme();

  return (
    <View
      backgroundColor="lightblue"
      paddingX={10}
      marginY={2}
      width="90%"
      marginX="auto"
      borderRadius={5}
    >
      <Pressable onPress={() => setCollapsed((prevState) => !prevState)}>
        <View
          display="flex"
          paddingY={5}
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Text color={colors.black} fontSize={18}>
            {title}
          </Text>
          <Feather name="arrow-down" size={24} color="black" />
        </View>
      </Pressable>
      <Collapsible
        collapsed={collapsed}
        align="center"
        style={{
          paddingBottom: 20,
        }}
      >
        {children}
      </Collapsible>
    </View>
  );
};

export default Accordion;
