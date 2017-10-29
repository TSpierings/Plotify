import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  @Input() items: Array<MapItem>;

  constructor() { }

  ngOnInit() {
  }

}

export interface MapItem {
  key: string;
  value: number;
  normalizedValue: number;
}
