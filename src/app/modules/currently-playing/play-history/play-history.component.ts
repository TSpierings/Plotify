import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from '../../auth-service/auth-service/auth.service';
import { HistoryRootObject, HistoryItem, Track, AudioFeaturesRootObject } from '../../interfaces/tracks';
import {
  trigger,
  style,
  animate,
  transition,
  stagger,
  query
} from '@angular/animations';

@Component({
  selector: 'app-play-history',
  templateUrl: './play-history.component.html',
  styleUrls: ['./play-history.component.scss'],
  animations: [
    trigger('trackstate', [
      transition('* => *', [
        query('.track-card:enter', style({ opacity: '0' }), { optional: true }),
        query('.track-card:enter', [
          stagger(50, [
            style({ opacity: '0' }),
            animate(250, style({ opacity: '1' }))
          ])
        ], { optional: true }),
        query('.track-card:leave', [
          style({ opacity: '1' }),
          animate(250, style({ opacity: '0' }))
        ], { optional: true }),
      ])
    ])
  ]
})
export class PlayHistoryComponent implements OnInit, OnChanges {

  @Input() newTrack: Track;
  historyItems: Array<HistoryItem> = [];

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.getHistory(20);
  }

  ngOnChanges() {
    if (this.newTrack != null &&  this.historyItems.length > 0) {
      this.getAudioFeatures([this.newTrack]);
      const newItem = <HistoryItem>{
        track: this.newTrack,
        played_at: new Date(),
      }
      const newHistory: Array<HistoryItem> = [newItem];
      newHistory.push(...this.historyItems);
      this.historyItems = newHistory;
    }
  }

  getHistory(limit: number) {
    const token = this.authService.getToken();
    const header = new HttpHeaders({'Authorization': 'Bearer ' + token});
    const params = new HttpParams().set('limit', limit.toString());
    const url = 'https://api.spotify.com/v1/me/player/recently-played';

    this.http.get(url, { headers: header, params: params }).toPromise()
      .then(response => {
        const data = response as HistoryRootObject;
        const newItems = data.items;
        this.getAudioFeatures(newItems.map(x => x.track));
        newItems.push(...this.historyItems);
        this.historyItems = newItems;
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
        .then(response => {
          const data = response as AudioFeaturesRootObject;
          data.audio_features.forEach(feature => tracks.find(track => track.id === feature.id).audioFeatures = feature);
        })
        .catch(error => console.log(error));
    }
  }

}
