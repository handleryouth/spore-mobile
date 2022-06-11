import { CLIENT_ID } from "@env";
import { ResponseType } from "expo-auth-session";

export const BASE_URL = "https://api.spotify.com/v1";
export const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
export const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

export const discovery = {
  authorizationEndpoint: AUTH_ENDPOINT,
  tokenEndpoint: TOKEN_ENDPOINT,
};

export const spotifyConfig = {
  responseType: ResponseType.Token,
  clientId: CLIENT_ID,
  scopes: ["playlist-modify-private", "playlist-read-private"],
  // In order to follow the "Authorization Code Flow"
  // to fetch token after authorizationEndpoint
  // this must be set to false
  usePKCE: false,
  redirectUri: "exp://192.168.1.8:19000/",
};
