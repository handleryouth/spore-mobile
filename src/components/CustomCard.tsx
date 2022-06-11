import React, { memo } from "react";
import { Pressable } from "react-native";
import { AspectRatio, Box, Heading, Image, Text } from "native-base";

import { CustomCardProps } from "../types";

const CustomCard = ({
  image,
  title,
  totalTracks,
  cardLink,
}: CustomCardProps) => {
  return (
    <Box alignItems="center">
      <Pressable onPress={cardLink}>
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

export default memo(CustomCard);
