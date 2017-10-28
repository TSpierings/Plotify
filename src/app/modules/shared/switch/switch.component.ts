import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Input() selectableItems: Array<string> = [];
  @Input() selectedItem: string;
  @Output() selectionChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  selectItem(item: string) {
    if (this.selectedItem === item) {
      return;
    }

    console.log(item);
    this.selectedItem = item;
    this.selectionChanged.emit(item);
  }

}
