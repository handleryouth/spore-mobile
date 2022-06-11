import React, { useCallback, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Center, FlatList, Input, View } from "native-base";

import { Card } from "../components";
import { AlbumProps, AppNavigatorParams } from "../types";
import { requestHelper } from "../utils";

export type HomeScreenProps = StackNavigationProp<AppNavigatorParams>;

const Home = () => {
  const [text, setText] = useState("");
  const [responseData, setResponseData] = useState<AlbumProps[]>([]);
  const navigation = useNavigation<HomeScreenProps>();

  const handleSearch = useCallback(() => {
    requestHelper
      .get(`/search`, {
        params: {
          q: text.replace(/\s/g, "+"),
          type: "album",
          limit: 10,
        },
      })
      .then((res) => {
        setResponseData(res.data.albums.items);
      });
  }, [text]);

  return (
    <>
      <Center marginY={3}>
        <Input
          onChangeText={(text) => setText(text)}
          placeholder="Search album"
          w="75%"
          fontSize={16}
          maxWidth="300px"
          InputRightElement={
            <Button size="lg" onPress={handleSearch}>
              Search
            </Button>
          }
        />
      </Center>
      {responseData && (
        <FlatList
          data={responseData}
          ItemSeparatorComponent={() => <View height={5} />}
          initialNumToRender={5}
          renderItem={({ item }) => (
            <Card
              cardLink={() =>
                navigation.navigate("Details", { albumId: item.id })
              }
              id={item.id}
              totalTracks={item.total_tracks}
              image={item.images[0].url}
              title={item.name}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </>
  );
};

export default Home;
