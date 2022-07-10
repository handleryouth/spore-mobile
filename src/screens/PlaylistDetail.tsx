import React, { useCallback, useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AspectRatio, Center, Image, ScrollView, Text } from "native-base";

import { Accordion } from "../components";
import { PlaylistDetailsResponse, PlaylistNavigatorParams } from "../types";
import { requestHelper } from "../utils";

type PlaylistDetailScreenProps = NativeStackScreenProps<
  PlaylistNavigatorParams,
  "Playlist Detail"
>;

const PlaylistDetail = ({ route }: PlaylistDetailScreenProps) => {
  const { playlistId } = route.params;
  const [responseData, setResponseData] = useState<PlaylistDetailsResponse>();

  const getAlbumDetail = useCallback(async () => {
    const playlistResponse = await Promise.all([
      requestHelper.get(`/playlists/${playlistId}/images`),
      requestHelper.get(`/playlists/${playlistId}/tracks`),
    ]);

    return playlistResponse;
  }, [playlistId]);

  useEffect(() => {
    let rendered = true;
    getAlbumDetail().then(
      (res) =>
        rendered &&
        setResponseData({ image: res[0].data, items: res[1].data.items })
    );

    return () => {
      rendered = false;
    };
  }, [getAlbumDetail]);

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
              uri: responseData.image[0].url,
            }}
            alt="Playlist Cover"
          />
        </AspectRatio>
      </Center>

      <Accordion title="Playlist Track">
        {responseData.items.map((playlist, index) => (
          <Text key={index} marginY={3}>
            {playlist.track.name} - {playlist.track.artists[0].name}
          </Text>
        ))}
      </Accordion>
    </ScrollView>
  );
};

export default PlaylistDetail;
