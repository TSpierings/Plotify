import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/modules/auth-service/auth-service/auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { SearchRootObject } from 'app/modules/interfaces/search';
import { ArtistItem } from 'app/modules/interfaces/artists';
import { TrackItem, Track, AudioFeaturesRootObject, Artist } from 'app/modules/interfaces/tracks';
import { Album } from 'app/modules/interfaces/player';
import { AlbumRootObject, AlbumEnvelope } from 'app/modules/interfaces/albums';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit {

  artists: Array<ArtistItem>;
  tracks: Array<Track>
  albums: Array<AlbumRootObject>;

  constructor(private authService: AuthService, private http: HttpClient) { }

  ngOnInit() {
    this.search('test');
  }

  search(value: string) {
    const token = this.authService.getToken();
    const header = new HttpHeaders({'Authorization': 'Bearer ' + token});
    const url = 'https://api.spotify.com/v1/search';
    const params = new HttpParams()
      .set('q', value)
      .set('type', 'artist,album,track')
      .set('limit', '5');

    this.http.get(url, { headers: header, params: params}).toPromise()
      .then(data => {
        const searchData = data as SearchRootObject;
        this.artists = searchData.artists.items;
        this.getAudioFeatures(searchData.tracks.items);
        this.tracks = searchData.tracks.items;
        this.getAlbums(searchData.albums.items);
        // this.albums = searchData.albums.items;
      })
      .catch(error => console.log(error));
  }

  getAudioFeatures(tracks: Array<Track>) {
    for (let index = 0; index < tracks.length; index += 100) {
      const token = this.authService.getToken();
      const header = new HttpHeaders({'Authorization': 'Bearer ' + token});
      const url = 'https://api.spotify.com/v1/audio-features';

      const trackString = tracks.map(track => track.id).slice(index, index + 100).join(',');

      const params = new HttpParams().set('ids', trackString);

      this.http.get(url, { headers: header, params: params}).toPromise()
        .then(data => {
          const response = data as AudioFeaturesRootObject;
          const actualFeatures = response.audio_features.filter(feature => !!feature);
          actualFeatures.forEach(feature => tracks.find(track => track.id === feature.id).audioFeatures = feature);
        })
        .catch(error => console.log(error));
    }
  }

  getAlbums(albums: Array<Album>) {
    const token = this.authService.getToken();
    const header = new HttpHeaders({'Authorization': 'Bearer ' + token});
    const url = 'https://api.spotify.com/v1/albums';

    const albumString = albums.map(album => album.id).join(',');

    const params = new HttpParams().set('ids', albumString);

    this.http.get(url, { headers: header, params: params}).toPromise()
      .then(data => {
        const response = data as AlbumEnvelope;
        this.albums = response.albums;
        console.log(response);
      })
      .catch(error => console.log(error));
  }

  getArtistNameString(artists: Array<Artist>): string {
    return artists.map(artist => artist.name).join(', ');
  }
}
