import React from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { AspectRatio, Box, Heading, Image, Text } from "native-base";

import { AppNavigatorParams, CustomCardProps } from "../types";

export type HomeScreenProps = StackNavigationProp<AppNavigatorParams>;

const CustomCard = ({ image, title, id, totalTracks }: CustomCardProps) => {
  const navigation = useNavigation<HomeScreenProps>();
  return (
    <Box alignItems="center">
      <Pressable
        onPress={() => navigation.navigate("Details", { albumId: id })}
      >
        <AspectRatio ratio={1 / 1} height={350} alignItems="center">
          <Image
            resizeMode="cover"
            source={{
              uri: image,
            }}
            alt="Album Cover"
          />
        </AspectRatio>

        <Heading size="xl" isTruncated maxW={320}>
          {title}
        </Heading>
        <Text fontSize={15}>Total tracks: {totalTracks}</Text>
      </Pressable>
    </Box>
  );
};

export default CustomCard;
