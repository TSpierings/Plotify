import { Component, OnInit, Input } from '@angular/core';
import { TrackItem, Artist } from '../../interfaces/tracks';
import {
  trigger,
  style,
  animate,
  transition,
  stagger,
  query
} from '@angular/animations';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss'],
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
export class TrackListComponent implements OnInit {

  @Input() tracks: Array<TrackItem>;

  constructor() { }

  ngOnInit() {
  }

  getArtistNameString(artists: Array<Artist>): string {
    return artists.map(artist => artist.name).join(', ');
  }

}
