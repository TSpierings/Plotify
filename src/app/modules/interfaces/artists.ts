import { ExternalUrls, Image } from './common';

export interface Followers {
    href?: any;
    total: number;
}

export interface ArtistItem {
    external_urls: ExternalUrls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export interface TopArtists {
    items: ArtistItem[];
    total: number;
    limit: number;
    offset: number;
    previous?: any;
    href: string;
    next: string;
}

export interface ArtistRootObject {
    artists: Array<ArtistItem>;
}
