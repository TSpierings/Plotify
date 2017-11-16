import { Component, OnInit, Input } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  stagger,
  query
} from '@angular/animations';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  animations: [
    trigger('barstate', [
      transition('* => *', [
        query(':enter .bar', style({ height: '0px' }), { optional: true }),
        query(':enter .bar', [
          stagger(25, [
            style({ height: '0px' }),
            animate(250, style({ height: '*' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class BarChartComponent implements OnInit {

  @Input() items: Array<MapItem>;
  @Input() reversed = false;

  constructor() { }

  ngOnInit() {
  }

}

export interface MapItem {
  key: string;
  value: number;
  normalizedValue: number;
}
