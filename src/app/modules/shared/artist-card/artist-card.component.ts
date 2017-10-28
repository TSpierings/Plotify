import { Component, OnInit, Input } from '@angular/core';
import { Item } from '../../interfaces/artists';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss']
})
export class ArtistCardComponent implements OnInit {

  @Input() artist: Item;
  @Input() rank: Number;

  constructor() { }

  ngOnInit() {
  }

}
