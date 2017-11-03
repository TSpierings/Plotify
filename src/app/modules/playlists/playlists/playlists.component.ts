import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PlaylistItem, PlaylistRootObject } from '../../interfaces/playlists';
import { TrackRootObject, TrackItem, Album } from '../../interfaces/tracks';
import { AuthService } from '../../auth-service/auth-service/auth.service'

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.scss']
})
export class PlaylistsComponent implements OnInit {

  private offset = 0;

  playlists: Array<PlaylistItem>;
  uAlbums = new Map<string, number>();

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.getPlaylists();
  }

  getUniqueAlbums(playlist: PlaylistItem): number {
    const albums = playlist.fullTracks.map(track => track.track.album);
    const uniqueAlbums = new Array<Album>();
    albums.forEach(album => {
      if (uniqueAlbums.findIndex(i => i.name === album.name) === -1) {
        uniqueAlbums.push(album);
      }
    });

    return uniqueAlbums.length;
  }

  getPlaylists() {
    const token = this.authService.getToken();
    const header = new HttpHeaders({'Authorization': 'Bearer ' + token});
    const url = 'https://api.spotify.com/v1/me/playlists';
    let params = new HttpParams().set('offset', this.offset.toString());
    // params = params.set('limit', '1');

    this.http.get(url, { headers: header, params: params}).toPromise()
      .then(data => {
        this.offset += 20;

        const response = data as PlaylistRootObject;

        response.items.forEach(playlist => this.getTracksFromPlaylist(playlist, 0));

        if (this.playlists == null) {
          this.playlists = response.items;
          return;
        }

        this.playlists.push(...response.items);
      })
      .catch(error => console.log(error));
  }

  getTracksFromPlaylist(playlist: PlaylistItem, offset: number) {
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
          this.getTracksFromPlaylist(playlist, offset + 100);
        } else {
          this.uAlbums.set(playlist.name, this.getUniqueAlbums(playlist));
        }
      })
      .catch(error => console.log(error));
  }
}
