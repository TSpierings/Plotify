import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArtistCardComponent } from './artist-card/artist-card.component';
import { SwitchComponent } from './switch/switch.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ArtistCardComponent,
    SwitchComponent,
    BarChartComponent
  ],
  declarations: [ArtistCardComponent, SwitchComponent, BarChartComponent]
})
export class SharedModule { }
