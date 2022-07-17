import { AlbumProps, ImageData } from "./data";

export interface HomeAlbumResponse {
  albums: {
    items: AlbumProps[];
  };
}

export interface AlbumsResponseData {
  items: AlbumProps[];
  limit: number;
  offset: number;
  total: number;
}

export interface PlaylistResponse {
  images: ImageData[];
  name: string;
  id: string;
  owner: {
    display_name: string;
    id: string;
  };
  tracks: {
    total: number;
  };
}

export interface PlaylistDetailsResponse {
  items: {
    track: AlbumProps;
  }[];
  image: ImageData[];
}
