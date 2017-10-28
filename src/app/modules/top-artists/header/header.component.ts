import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() selectedTimeRangeChanged = new EventEmitter<string>();

  selectableItems = [
    '4 weeks',
    '6 months',
    'several years'
  ];

  constructor() { }

  ngOnInit() {
  }

  selectedItemChanged(item: string) {
    let timeRange = "";

    switch(item) {
      case this.selectableItems[0]:
        timeRange = "short_term";
        break;
      case this.selectableItems[1]:
        timeRange = "medium_term";
        break;
      case this.selectableItems[2]:
        timeRange = "long_term";
        break;
    }

    this.selectedTimeRangeChanged.emit(timeRange);
  }

}
