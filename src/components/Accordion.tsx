import React, {
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import { Animated, Easing } from "react-native";
import Collapsible from "react-native-collapsible";
import { Feather } from "@expo/vector-icons";
import { Pressable, Text, useTheme, View } from "native-base";

interface AccordionProps {
  title: string;
  children: ReactNode;
}

const AnimatedIcon = Animated.createAnimatedComponent(Feather);

const Accordion = ({ title, children }: AccordionProps) => {
  const [collapsed, setCollapsed] = useState(true);
  const { colors } = useTheme();

  const spinValue = useRef(new Animated.Value(0)).current;

  const halfRotation = useMemo(
    () =>
      spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["180deg", "0deg"],
      }),
    [spinValue]
  );

  const handleCollapseEvent = useCallback(() => {
    setCollapsed((prevState) => !prevState);
    Animated.timing(spinValue, {
      toValue: collapsed ? 1 : 0,
      duration: 200,
      easing: Easing.ease, // Easing is an additional import from react-native
      useNativeDriver: true, // To make use of native driver for performance
    }).start();
  }, [collapsed, spinValue]);

  return (
    <View
      backgroundColor="lightblue"
      paddingX={10}
      marginY={2}
      width="90%"
      marginX="auto"
      borderRadius={5}
    >
      <Pressable onPress={handleCollapseEvent}>
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
          <AnimatedIcon
            name="arrow-down"
            size={24}
            color="black"
            style={{
              transform: [{ rotate: halfRotation }],
            }}
          />
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
