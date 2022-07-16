import React, { useCallback, useMemo, useState } from "react";
import { Keyboard } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Button, Center, FlatList, Input, Spinner, View } from "native-base";

import { Card, EmptyData } from "../components";
import { requestLoading, RootState } from "../library";
import { AlbumProps, AppNavigatorParams } from "../types";
import { requestHelper } from "../utils";

export type HomeScreenProps = StackNavigationProp<AppNavigatorParams>;

const Home = () => {
  const [text, setText] = useState("");
  const [responseData, setResponseData] = useState<AlbumProps[]>([]);
  const navigation = useNavigation<HomeScreenProps>();
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.request
  );

  const getDataList = useMemo(() => {
    switch (loading) {
      case "idle":
        return <EmptyData height={400} message="looking for something ?" />;
      case "pending":
        return <Spinner color="emerald.500" />;
      case "success":
        return responseData.length > 0 ? (
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
        ) : (
          <EmptyData height={400} message="It's emty" />
        );
      default:
        return;
    }
  }, [loading, navigation, responseData]);

  const handleSearch = useCallback(() => {
    Keyboard.dismiss();
    dispatch(requestLoading());

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
  }, [dispatch, text]);

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
            <Button size="lg" onPress={handleSearch}>
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
