import { DrawerNavigationProp } from "@react-navigation/drawer";
export interface ArtistProps {
  href: string;
  id: string;
  name: string;
}

export interface UserData {
  display_name: string;
  followers: {
    total: number;
    href: string;
  };
  images: ImageData[];
  id: string;
}

export interface AlbumProps {
  album_type: string;
  name: string;
  artists: ArtistProps[];
  id: string;
  release_date: string;
  total_tracks: number;
  images: ImageData[];
  tracks: { items: SpotifySearchResponse[] };
}

export interface CustomCardProps {
  image: string;
  id: string;
  title: string;
  totalTracks: number;
  toggleSelected?: () => void;
  toggleDeselected?: () => void;
  selectCondition?: boolean;
  enabledDetails?: boolean;
  allowSelect?: boolean;
}

export interface ImageData {
  height: number;
  url: string;
  width: number;
}

export interface SpotifySearchResponse {
  name: string;
  id: string;
  track_number: number;
  artists: ArtistProps[];
  album: {
    release_date: string;
    images: ImageData[];
  };
}

export type DrawerStackParam = {
  Main: undefined;
  NewAlbum: undefined;
};

export type AppNavigatorParams = {
  Home: undefined;
  Details: { albumId: string };
};

export type NavigationProps = DrawerNavigationProp<DrawerStackParam>;

export interface AlbumsResponseData {
  items: AlbumProps[];
  limit: number;
  offset: number;
  total: number;
}
