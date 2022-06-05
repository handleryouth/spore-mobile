import React, { useCallback, useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";
import { Button, View } from "native-base";

import { Card } from "../components";
import { AlbumProps } from "../types";
import { requestHelper } from "../utils";

const NewAlbum = () => {
  const [responseData, setResponseData] = useState<AlbumProps[]>([]);

  const totalItem = useRef(0);

  const [currentOffset, setCurrentOffset] = useState(0);

  const handleGetData = useCallback(() => {
    requestHelper
      .get("/browse/new-releases", {
        params: {
          limit: 10,
          offset: currentOffset,
        },
      })
      .then((res) => {
        totalItem.current = res.data.albums.total;
        setResponseData((prevState) => [
          ...prevState,
          ...res.data.albums.items,
        ]);
      });
  }, [currentOffset]);

  const handleFetchMore = useCallback(() => {
    if (totalItem.current > currentOffset) {
      setCurrentOffset((prevState) => prevState + 10);
    }
  }, [currentOffset]);

  useEffect(() => {
    handleGetData();
  }, [handleGetData]);

  return (
    <>
      {responseData.length > 0 && (
        <FlatList
          data={responseData}
          ItemSeparatorComponent={() => <View height={5} />}
          renderItem={({ item, index }) => (
            <Card
              key={index}
              id={item.id}
              totalTracks={item.total_tracks}
              image={item.images[0].url}
              title={item.name}
            />
          )}
        />
      )}
      <Button onPress={handleFetchMore}>Add more</Button>
    </>
  );
};

export default NewAlbum;
