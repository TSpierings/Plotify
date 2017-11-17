import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PlaylistItem, PlaylistRootObject } from '../../interfaces/playlists';
import { AuthService } from '../../auth-service/auth-service/auth.service';
import {
  trigger,
  style,
  animate,
  transition,
  stagger,
  query
} from '@angular/animations';

@Component({
  selector: 'app-playlist-carousel',
  templateUrl: './playlist-carousel.component.html',
  styleUrls: ['./playlist-carousel.component.scss'],
  animations: [
    trigger('carouselstate', [
      transition('* => *', [
        query('.playlist-card:enter', style({ opacity: '0' }), { optional: true }),
        query('.playlist-card:enter', [
          stagger(50, [
            style({ opacity: '0' }),
            animate(250, style({ opacity: '1' }))
          ])
        ], { optional: true }),
        query('.playlist-card:leave', [
          style({ opacity: '1' }),
          animate(250, style({ opacity: '0' }))
        ], { optional: true }),
      ])
    ])
  ]
})
export class PlaylistCarouselComponent implements OnInit {

  @Output() selectPlaylist = new EventEmitter<PlaylistItem>();
  playlists: Array<PlaylistItem>;
  selectedPlaylist: PlaylistItem;

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit() {
    this.getPlaylists(0);
  }

  openPlaylist(playlist: PlaylistItem) {
    if (this.selectedPlaylist !== playlist) {
      this.selectedPlaylist = playlist;
      this.selectPlaylist.emit(this.selectedPlaylist);
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
}
