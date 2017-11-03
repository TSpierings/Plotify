import { ExternalUrls, Image } from './common';
import { TrackItem } from './tracks';

export interface Owner {
    display_name: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
}

export interface Tracks {
    href: string;
    total: number;
}

export interface PlaylistItem {
    collaborative: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: Owner;
    public: boolean;
    snapshot_id: string;
    tracks: Tracks;
    type: string;
    uri: string;

    // Custom fields
    fullTracks?: Array<TrackItem>;
}

export interface PlaylistRootObject {
    href: string;
    items: PlaylistItem[];
    limit: number;
    next?: any;
    offset: number;
    previous?: any;
    total: number;
}
