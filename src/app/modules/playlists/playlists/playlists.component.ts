import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PlaylistItem, PlaylistRootObject } from '../../interfaces/playlists';
import { TrackRootObject, TrackItem, Album, AudioFeaturesRootObject, Artist } from '../../interfaces/tracks';
import { AuthService } from '../../auth-service/auth-service/auth.service'

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {
  playlists: Array<PlaylistItem>;
  uAlbums = new Map<string, number>();
  selectedPlaylist: PlaylistItem;

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.getPlaylists(0);
  }

  openPlaylist(playlist: PlaylistItem) {
    if (this.selectedPlaylist !== playlist) {
      this.selectedPlaylist = playlist;
      if (playlist.fullTracks == null) {
        this.getTracksForPlaylist(this.selectedPlaylist, 0);
      }      
    }
  }

  getPlaylists(offset: number) {
    const token = this.authService.getToken();
    const header = new HttpHeaders({'Authorization': 'Bearer ' + token});
    const url = 'https://api.spotify.com/v1/me/playlists';
    let params = new HttpParams().set('offset', offset.toString());
    params = params.set('limit', '50');

    this.http.get(url, { headers: header, params: params}).toPromise()
      .then(data => {

        const response = data as PlaylistRootObject;

        if (this.playlists == null) {
          this.playlists = response.items;
        } else {
          this.playlists.push(...response.items);
        }        

        if (response.offset + response.limit < response.total) {
          this.getPlaylists(offset + response.limit);
        }
      })
      .catch(error => console.log(error));
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
        })
        .catch(error => console.log(error));
    }
  }

  getArtistNameString(artists: Array<Artist>): string {
    return artists.map(artist => artist.name).join(', ');
  }

}