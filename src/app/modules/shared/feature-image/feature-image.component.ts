import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feature-image',
  templateUrl: './feature-image.component.html',
  styleUrls: ['./feature-image.component.scss']
})
export class FeatureImageComponent implements OnInit {

  @Input() feature: number;
  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

}
