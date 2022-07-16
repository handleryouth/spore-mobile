import React, { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAuthRequest } from "expo-auth-session";
import { Button, Heading, Text, View } from "native-base";

import { addToken, addUserProfile } from "../library";
import {
  discovery,
  getDimensionHelper,
  requestHelper,
  spotifyConfig,
} from "../utils";

const Login = () => {
  const dispatch = useDispatch();

  const { width, height } = getDimensionHelper();

  const [, response, promptAsync] = useAuthRequest(spotifyConfig, discovery);

  const handleGetUserProfile = useCallback(
    async (value) => {
      await requestHelper
        .get("/me", {
          headers: {
            Authorization: `Bearer ${value}`,
          },
        })
        .then((res) => dispatch(addUserProfile(res.data)));
    },
    [dispatch]
  );

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      dispatch(addToken(access_token));
      handleGetUserProfile(access_token);
    }
  }, [dispatch, handleGetUserProfile, response]);

  return (
    <View
      width={width}
      height={height}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Heading
        size="2xl"
        textAlign="center"
        marginBottom={2}
        fontFamily="heading"
        fontWeight={800}
      >
        Welcome to Mobile Spore
      </Heading>
      <Text fontSize={18} marginBottom={4} fontFamily="body" fontWeight={400}>
        Please grant access to your spotify
      </Text>
      <Button
        onPress={() => promptAsync()}
        width="2/4"
        minWidth={200}
        maxWidth={300}
        colorScheme="blue"
      >
        <Text
          fontFamily="body"
          fontWeight={600}
          fontStyle="normal"
          color="white"
        >
          Login
        </Text>
      </Button>
    </View>
  );
};

export default Login;
