export interface HomeAlbumRequest {
  q: string;
  type: "album";
  limit: number;
}

export type AppNavigatorParams = {
  Home: undefined;
  Details: { albumId: string };
};

export type PlaylistNavigatorParams = {
  Playlist: undefined;
  "Playlist Detail": { playlistId: string };
};
