import { ArtistItem } from './artists';
import { Album } from './player';
import { Track } from './tracks';

export interface Collection {
    href: string,
    limit: number,
    next: string,
    offset: number,
    previous: number,
    total: number
}

export interface ArtistCollection extends Collection {
    items: Array<ArtistItem>
}

export interface AlbumCollection extends Collection {
    items: Array<Album>
}

export interface TrackCollection extends Collection {
    items: Array<Track>
}

export interface SearchRootObject {
    artists: ArtistCollection,
    albums: AlbumCollection,
    tracks: TrackCollection
}