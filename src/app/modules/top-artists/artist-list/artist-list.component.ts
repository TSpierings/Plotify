import { Component, OnInit, Input } from '@angular/core';
import { ArtistItem } from '../../interfaces/artists'
import {
  trigger,
  style,
  animate,
  transition,
  stagger,
  query
} from '@angular/animations';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss'],
  animations: [
    trigger('cardstate', [
      transition('* => *', [
        query('.card:enter', style({ opacity: '0' }), { optional: true }),
        query('.card:enter', [
          stagger(50, [
            style({ opacity: '0' }),
            animate(250, style({ opacity: '1' }))
          ])
        ], { optional: true }),
        query('.card:leave', [
          style({ opacity: '1' }),
          animate(250, style({ opacity: '0' }))
        ], { optional: true }),
      ])
    ])
  ]
})
export class ArtistListComponent implements OnInit {

  @Input() artists: Array<ArtistItem>;

  constructor() { }

  ngOnInit() {
  }

}
