import { ExternalUrls, Image } from './common';
import { ArtistItem } from './artists';
import { TrackItem } from './tracks';

export interface Copyright {
    text: string;
    type: string;
}

export interface ExternalIds {
    upc: string;
}

export interface AlbumRootObject {
    album_type: string;
    artists: ArtistItem[];
    available_markets: string[];
    copyrights: Copyright[];
    external_ids: ExternalIds;
    external_urls: ExternalUrls;
    genres: any[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    release_date: string;
    release_date_precision: string;
    tracks: Tracks;
    type: string;
    uri: string;
}

export interface Tracks {
    href: string;
    items: TrackItem[];
    limit: number;
    next?: any;
    offset: number;
    previous?: any;
    total: number;
}

export interface AlbumEnvelope {
    albums: Array<AlbumRootObject>;
}
