import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { Box, Button, Heading, ScrollView, useToast } from "native-base";

import { Input } from "../components";
import { RootState } from "../library";
import { requestHelper } from "../utils";

const CreatePlaylist = () => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");
  const toast = useToast();

  const userData = useSelector((state: RootState) => state.user);

  const handleCreatePlayList = useCallback(async () => {
    await requestHelper
      .post(`/users/${userData.id}/playlists`, {
        name: playlistName,
        description: playlistDescription,
        public: false,
        collaborative: false,
      })
      .catch(() =>
        toast.show({
          description: "Something went wrong",
        })
      );
  }, [playlistDescription, playlistName, toast, userData.id]);

  return (
    <ScrollView>
      <Heading textAlign="center" marginY={5}>
        Create your own playlist
      </Heading>

      <Box alignItems="center">
        <Input
          label="Playlist Name"
          placeholder="Playlist Name"
          onChangeText={(value) => setPlaylistName(value)}
        />
        <Input
          label="Playlist Description"
          placeholder="Playlist Description"
          onChangeText={(value) => setPlaylistDescription(value)}
        />

        <Button
          colorScheme="blue"
          size="md"
          color="white"
          marginTop={4}
          width="50%"
          maxW="300px"
          onPress={handleCreatePlayList}
        >
          Submit
        </Button>
      </Box>
    </ScrollView>
  );
};

export default CreatePlaylist;
