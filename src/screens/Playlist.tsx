import React, { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View } from "native-base";

import { Card } from "../components";
import { PlaylistNavigatorParams, PlaylistResponse } from "../types";
import { requestHelper } from "../utils";

export type PlaylistScreenProps = StackNavigationProp<PlaylistNavigatorParams>;

const Playlist = () => {
  const [playlist, setPlaylist] = useState<PlaylistResponse[]>([]);
  const navigation = useNavigation<PlaylistScreenProps>();

  const handleGetPlaylist = useCallback(async () => {
    await requestHelper
      .get(`/me/playlists`, {
        params: {
          offset: 0,
          limit: 10,
        },
      })
      .then((res) => {
        setPlaylist(res.data.items);
      });
  }, []);

  useEffect(() => {
    handleGetPlaylist();
  }, [handleGetPlaylist]);

  return (
    <View>
      {playlist.length > 0 && (
        <FlatList
          data={playlist}
          ItemSeparatorComponent={() => <View height={5} />}
          initialNumToRender={5}
          renderItem={({ item }) => (
            <Card
              cardLink={() =>
                navigation.navigate("Playlist Detail", { playlistId: item.id })
              }
              id={item.id}
              totalTracks={item.tracks.total}
              image={item.images[0].url}
              title={item.name}
            />
          )}
        />
      )}
    </View>
  );
};

export default Playlist;
