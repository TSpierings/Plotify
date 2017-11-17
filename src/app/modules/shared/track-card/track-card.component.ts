import { Component, OnInit, Input } from '@angular/core';
import { TrackItem, Artist } from '../../interfaces/tracks';

@Component({
  selector: 'app-track-card',
  templateUrl: './track-card.component.html',
  styleUrls: ['./track-card.component.scss']
})
export class TrackCardComponent implements OnInit {

  @Input() track: TrackItem;

  constructor() { }

  ngOnInit() {
  }

  getArtistNameString(artists: Array<Artist>): string {
    return artists.map(artist => artist.name).join(', ');
  }

}
