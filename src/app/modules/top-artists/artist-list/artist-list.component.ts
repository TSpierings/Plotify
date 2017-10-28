import { Component, OnInit, Input } from '@angular/core';
import { Item }  from '../../interfaces/artists'

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss']
})
export class ArtistListComponent implements OnInit {

  @Input() artists: Array<Item>;

  constructor() { }

  ngOnInit() {
  }

}
