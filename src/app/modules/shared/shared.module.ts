import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistCardComponent } from './artist-card/artist-card.component';
import { SwitchComponent } from './switch/switch.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { FeatureImageComponent } from './feature-image/feature-image.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ArtistCardComponent,
    SwitchComponent,
    BarChartComponent,
    FeatureImageComponent
  ],
  declarations: [ArtistCardComponent, SwitchComponent, BarChartComponent, FeatureImageComponent]
})
export class SharedModule { }
