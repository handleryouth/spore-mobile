export interface ImageData {
  height: number;
  url: string;
  width: number;
}

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

export interface SearchData {
  name: string;
  id: string;
  track_number: number;
  artists: ArtistProps[];
  album: {
    release_date: string;
    images: ImageData[];
  };
}

export interface AlbumProps {
  album_type: string;
  name: string;
  artists: ArtistProps[];
  id: string;
  release_date: string;
  total_tracks: number;
  images: ImageData[];
  tracks: { items: SearchData[] };
}
