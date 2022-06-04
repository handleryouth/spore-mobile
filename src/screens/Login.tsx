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
      <Heading size="2xl" textAlign="center" marginBottom={2}>
        Welcome to Mobile Spore{" "}
      </Heading>
      <Text fontSize={18} marginBottom={4}>
        Please grant access to your spotify
      </Text>
      <Button onPress={() => promptAsync()}>Login</Button>
    </View>
  );
};

export default Login;
