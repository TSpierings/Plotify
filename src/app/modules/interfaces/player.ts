import { ExternalUrls, Image } from './common';
import { Track } from './tracks';

export interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface Album {
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    type: string;
    uri: string;
}
export interface ExternalIds {
    isrc: string;
}

export interface Context {
    external_urls: ExternalUrls;
    href: string;
    type: string;
    uri: string;
}

export interface PlayerRootObject {
    timestamp: number;
    progress_ms: number;
    is_playing: boolean;
    item: Track;
    context: Context;
}
