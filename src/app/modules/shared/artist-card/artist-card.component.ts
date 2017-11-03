import { Component, OnInit, Input } from '@angular/core';
import { ArtistItem } from '../../interfaces/artists';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss']
})
export class ArtistCardComponent implements OnInit {

  @Input() artist: ArtistItem;
  @Input() rank: Number;

  constructor() { }

  ngOnInit() {
  }

}
