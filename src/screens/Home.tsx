import React, { useCallback, useMemo, useState } from "react";
import { Keyboard } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Center, FlatList, Input, Spinner, View } from "native-base";

import { Card, EmptyData } from "../components";
import {
  AppNavigatorParams,
  HomeAlbumRequest,
  HomeAlbumResponse,
} from "../types";
import { useQuery } from "../utils";

export type HomeScreenProps = StackNavigationProp<AppNavigatorParams>;

const Home = () => {
  const [text, setText] = useState("");
  const navigation = useNavigation<HomeScreenProps>();

  const { attemptRequest, data, loading } = useQuery<
    HomeAlbumRequest,
    HomeAlbumResponse
  >({
    endpoint: "/search",
    method: "GET",
    params: {
      q: text.replace(/\s/g, "+"),
      type: "album",
      limit: 10,
    },
  });

  const getDataList = useMemo(() => {
    switch (loading) {
      case "idle":
        return <EmptyData height={400} message="looking for something ?" />;
      case "loading":
        return <Spinner color="emerald.500" />;
      case "success":
        return data && data.albums?.items?.length > 0 ? (
          <FlatList
            data={data.albums.items}
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
        ) : (
          <EmptyData
            height={400}
            message="It's empty"
            icon={<Entypo name="circle-with-cross" size={50} color="red" />}
          />
        );
      default:
        return;
    }
  }, [data, loading, navigation]);

  const handleSearch = useCallback(() => {
    Keyboard.dismiss();
    attemptRequest();
  }, [attemptRequest]);

  return (
    <>
      <Center marginY={3}>
        <Input
          onChangeText={(text) => setText(text)}
          placeholder="Search album"
          onSubmitEditing={handleSearch}
          w="75%"
          fontSize={16}
          maxWidth="300px"
          InputRightElement={
            <Button size="lg" onPress={handleSearch} colorScheme="blue">
              Search
            </Button>
          }
        />
      </Center>
      {getDataList}
    </>
  );
};

export default Home;
