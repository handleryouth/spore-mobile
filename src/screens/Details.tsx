import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  AspectRatio,
  Center,
  Image,
  ScrollView,
  Stagger,
  Text,
} from "native-base";

import { Accordion } from "../components";
import { AlbumProps, AppNavigatorParams } from "../types";
import { requestHelper } from "../utils";

type DetailsScreenProps = NativeStackScreenProps<AppNavigatorParams, "Details">;

const Details = ({ route }: DetailsScreenProps) => {
  const { albumId } = route.params;
  const [responseData, setResponseData] = useState<AlbumProps>();

  useEffect(() => {
    let rendered = true;
    requestHelper
      .get(`/albums/${albumId}`)
      .then((res) => rendered && setResponseData(res.data));
    return () => {
      rendered = false;
    };
  }, [albumId]);

  if (!responseData) {
    return null;
  }

  return (
    <ScrollView>
      <Center marginY={5}>
        <AspectRatio ratio={1 / 1} height={350}>
          <Image
            resizeMode="cover"
            source={{
              uri: responseData?.images[0].url,
            }}
            alt="Album Cover"
          />
        </AspectRatio>
      </Center>

      <Stagger
        visible
        initial={{
          opacity: 0,
          scale: 0,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: {
            type: "spring",
            mass: 0.5,
            stagger: {
              offset: 30,
            },
            useNativeDriver: true,
          },
        }}
      >
        <Accordion title="Type">
          <Text>{responseData.album_type}</Text>
        </Accordion>
        <Accordion title="Total Tracks">
          <Text>{responseData.total_tracks}</Text>
        </Accordion>
        <Accordion title="Artists">
          {
            <View>
              {responseData.artists.map((artist, index) => (
                <Text key={index}>{artist.name}</Text>
              ))}
            </View>
          }
        </Accordion>
        <Accordion title="Track Albums">
          {responseData.tracks.items.map((track, index) => (
            <Text key={index}>{track.name}</Text>
          ))}
        </Accordion>
      </Stagger>
    </ScrollView>
  );
};

export default Details;
