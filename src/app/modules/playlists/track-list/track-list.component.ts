import { Component, OnInit, Input } from '@angular/core';
import { TrackItem, Artist } from '../../interfaces/tracks';

@Component({
  selector: 'app-track-list',
  templateUrl: './track-list.component.html',
  styleUrls: ['./track-list.component.scss']
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
