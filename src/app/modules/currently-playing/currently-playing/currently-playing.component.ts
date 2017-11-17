import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../../auth-service/auth-service/auth.service';
import { PlayerRootObject } from '../../interfaces/player';
import { ArtistItem } from '../../interfaces/artists';
import { AudioFeatures } from '../../interfaces/tracks';

@Component({
  selector: 'app-currently-playing',
  templateUrl: './currently-playing.component.html',
  styleUrls: ['./currently-playing.component.scss']
})
export class CurrentlyPlayingComponent implements OnInit {

  player: PlayerRootObject;
  currentArtist: ArtistItem;
  currentAudioFeatures: AudioFeatures;

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.getCurrentlyPlaying();
  }

  getCurrentlyPlaying() {
    const token = this.authService.getToken();
    const header = new HttpHeaders({'Authorization': 'Bearer ' + token});
    const url = 'https://api.spotify.com/v1/me/player/currently-playing';

    this.http.get(url, { headers: header, observe: 'response'}).toPromise()
      .then(response => {
        if (response.status == 200) {
          const data = response.body as PlayerRootObject;
          this.player = data;
          this.getAlbum(this.player.item.artists[0].id);
          this.getFeatures(this.player.item.id);
          const refreshInMs = this.player.item.duration_ms - this.player.progress_ms + 1000;
          setTimeout(() => this.getCurrentlyPlaying(), refreshInMs);
        }
      })
      .catch(error => console.log(error));
  }

  getAlbum(artist: string) {
    const token = this.authService.getToken();
    const header = new HttpHeaders({'Authorization': 'Bearer ' + token});
    const url = 'https://api.spotify.com/v1/artists/' + artist;

    this.http.get(url, { headers: header }).toPromise()
      .then(response => {
        const data = response as ArtistItem;
        this.currentArtist = data;
      })
      .catch(error => console.log(error));
  }

  getFeatures(track: string) {
    const token = this.authService.getToken();
    const header = new HttpHeaders({'Authorization': 'Bearer ' + token});
    const url = 'https://api.spotify.com/v1/audio-features/' + track;

    this.http.get(url, { headers: header }).toPromise()
      .then(response => {
        const data = response as AudioFeatures;
        this.currentAudioFeatures = data;
      })
      .catch(error => console.log(error));
  }
}
