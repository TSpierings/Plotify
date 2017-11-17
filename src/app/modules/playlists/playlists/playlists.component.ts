import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PlaylistItem, PlaylistRootObject } from '../../interfaces/playlists';
import { TrackRootObject, TrackItem, Album, AudioFeaturesRootObject, Artist, AudioFeatures } from '../../interfaces/tracks';
import { AuthService } from '../../auth-service/auth-service/auth.service';
import { ArtistItem, ArtistRootObject} from '../../interfaces/artists';
import { MapItem } from '../../shared/bar-chart/bar-chart.component';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  selectedPlaylist: PlaylistItem;
  allArtists: Array<ArtistItem> = [];
  weightedGenres: Array<MapItem>;
  avaragedFeatures: AudioFeatures;
  tracksInPlaylist: Array<TrackItem>;

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() { }

  openPlaylist(playlist: PlaylistItem) {
    this.selectedPlaylist = playlist;
    this.tracksInPlaylist = [];

    if (playlist.fullTracks == null) {
      this.getTracksForPlaylist(this.selectedPlaylist, 0);
    } else {
      this.tracksInPlaylist = playlist.fullTracks;
    }
  }

  getTracksForPlaylist(playlist: PlaylistItem, offset: number) {
    const token = this.authService.getToken();
    const header = new HttpHeaders({'Authorization': 'Bearer ' + token});
    const params = new HttpParams().set('offset', offset.toString());

    this.http.get(playlist.tracks.href, { headers: header, params: params }).toPromise()
      .then(data => {
        const response = data as TrackRootObject;

        if (playlist.fullTracks == null) {
          playlist.fullTracks = [];
        }

        playlist.fullTracks.push(...response.items);

        if (playlist.fullTracks.length < playlist.tracks.total) {
          this.getTracksForPlaylist(playlist, offset + 100);
        } else {
          this.getArtists(this.selectedPlaylist.fullTracks);
          this.getAudioFeatures(playlist.fullTracks);
        }
      })
      .catch(error => console.log(error));
  }

  getAudioFeatures(tracks: Array<TrackItem>) {
    for (let index = 0; index < tracks.length; index += 100) {
      const token = this.authService.getToken();
      const header = new HttpHeaders({'Authorization': 'Bearer ' + token});
      const url = 'https://api.spotify.com/v1/audio-features';

      const trackString = tracks.map(track => track.track.id).slice(index, index + 100).join(',');

      const params = new HttpParams().set('ids', trackString);

      this.http.get(url, { headers: header, params: params}).toPromise()
        .then(data => {
          const response = data as AudioFeaturesRootObject;
          response.audio_features.forEach(feature => tracks.find(track => track.track.id === feature.id).audioFeatures = feature);

          if (index + 100 >= tracks.length) {
            this.tracksInPlaylist = this.selectedPlaylist.fullTracks;
          }
        })
        .catch(error => console.log(error));
    }
  }

  getArtists(tracks: Array<TrackItem>) {
    const newAllArtists = this.allArtists;
    // Flatten to array of artist id's
    const artistIds = tracks.map(track => track.track.artists.map(artist => artist.id)).reduce((a, c) => a.concat(c), []);
    // Deduplicate artists
    const unqiqueArtists: Array<string> = [];
    artistIds.forEach(artistId => {
      if (unqiqueArtists.findIndex(existingId => existingId === artistId) === -1) {
        unqiqueArtists.push(artistId);
      }
    });

    // Filter artists that we already have
    const filteredArtists = artistIds.filter(artist => this.allArtists.findIndex(existing => artist === existing.id) === -1);

    for (let index = 0; index < filteredArtists.length; index += 50) {
      const token = this.authService.getToken();
      const header = new HttpHeaders({'Authorization': 'Bearer ' + token});
      const url = 'https://api.spotify.com/v1/artists';

      const trackString = filteredArtists.slice(index, index + 50).join(',');

      const params = new HttpParams().set('ids', trackString);

      this.http.get(url, { headers: header, params: params}).toPromise()
        .then(data => {
          const response = data as ArtistRootObject;
          newAllArtists.push(...response.artists);

          if (index + 50 < filteredArtists.length) {
            this.allArtists = newAllArtists;
          }
        })
        .catch(error => console.log(error));
    }
  }

}
